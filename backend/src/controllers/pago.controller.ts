import type { Request, Response } from 'express';
import mp from '../config/mercadoPago.js';
import { Preference } from 'mercadopago/dist/clients/preference/index.js';
import { suscripcion } from '../models/suscripcion.js';
import { Op } from 'sequelize';
import { Payment } from 'mercadopago/dist/clients/payment/index.js';
import { transaccion } from '../models/transaccion.js';

export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;

  if (!idUsuario) {
    res.status(401).json({ error: 'Usuario no autenticado' });
    return;
  }

  try {
    const hoy = new Date();

    const suscripcionActiva = await suscripcion.findOne({
      where: {
        idUsuario: idUsuario,
        estado: true,
        fechaTermino: {
          [Op.gt]: hoy,
        },
      },
    });

    if (suscripcionActiva) {
      const fechaFin = new Date(suscripcionActiva.fechaTermino);
      const fechaFormateada = fechaFin.toLocaleDateString('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      res.status(409).json({
        mensaje: `Ya tienes una suscripción activa hasta el ${fechaFormateada}.`,
        suscripcion: suscripcionActiva,
      });
      return;
    }

    const preferenceClient = new Preference(mp);

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: 'premium_001',
            title: 'Suscripción Premium',
            quantity: 1,
            unit_price: 4990,
            currency_id: 'CLP',
          },
        ],
        back_urls: {
          success: 'https://universilandia.cl/success',
          failure: 'https://universilandia.cl/failure',
          pending: 'https://universilandia.cl/pending',
        },
        auto_return: 'approved',
        external_reference: idUsuario,
      },
    });
    const sandboxLink = preference.sandbox_init_point || preference.init_point;
    console.log('✅ Preferencia creada (init_point):', sandboxLink);
    res.status(200).json({ init_point: sandboxLink });

    // console.log('✅ Preferencia creada:', preference);
    // res.status(200).json({ init_point: preference.init_point });

  } catch (error) {
    console.error('❌ Error al crear preferencia de pago:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
};

//AQUI COMIENZA EL METODO PARA PROCESAR EL WEBHOOK DE MERCADOPAGO. 
// Este método recibe notificaciones de MercadoPago cuando se realizan pagos

export const webhookNotificacion = async (req: Request, res: Response): Promise<void> => {
  let body;
  try {
    const rawBody = req.body;
    console.log('📥 Webhook RAW body:', rawBody.toString());

    body = JSON.parse(rawBody.toString());
  } catch (err) {
    console.error('❌ Error al parsear el body:', err);
    res.status(400).send('Invalid body format');
    return;
  }

  console.log('🔥 Webhook body Parseado:', JSON.stringify(body, null, 2));

  try {
    if (body.type !== 'payment') {
      console.log('⚠ Evento ignorado (no es de tipo payment)');
      res.status(200).send('Evento ignorado (no es de tipo payment)');
      return;
    }

    const paymentId = body.data?.id;

    if (!paymentId) {
      console.log('❌ No se recibió paymentId en el body');
      res.status(400).send('Falta paymentId');
      return;
    }

    const paymentClient = new Payment(mp);

    console.log(`🔍 Consultando detalles del pago en MercadoPago, paymentId: ${paymentId}`);

    const pago = await paymentClient.get({ id: paymentId });

    console.log('✅ Datos del pago obtenidos:', JSON.stringify(pago, null, 2));

    const estadoPago = pago.status;
    const montoPago = pago.transaction_amount;
    const metodoPago = pago.payment_method_id;
    const idUsuario = pago.external_reference;

    if (!idUsuario) {
      console.log('❌ No se recibió external_reference (idUsuario) en el pago');
      res.status(400).send('No se pudo procesar: falta idUsuario en external_reference');
      return;
    }

    // Evitar duplicados
    const existente = await transaccion.findOne({
      where: { referenciaExterna: paymentId.toString() },
    });

    if (existente) {
      console.log('⚠️ Transacción ya registrada por webhook');
      res.status(200).send('Ya registrado');
      return;
    }

    let nuevaSuscripcionId: string | undefined;

    if (estadoPago === 'approved') {
      console.log('✅ Estado aprobado: creando suscripción');

      const hoy = new Date();
      const fechaFin = new Date();
      fechaFin.setDate(hoy.getDate() + 30);

      const nuevaSuscripcion = await suscripcion.create({
        idUsuario,
        fechaInicio: hoy,
        fechaTermino: fechaFin,
        estado: true,
      });

      nuevaSuscripcionId = nuevaSuscripcion.idSuscripcion;

      console.log(`✅ Suscripción creada con id: ${nuevaSuscripcionId}`);
    } else {
      console.log(`⚠ Estado del pago no aprobado (${estadoPago}), no se crea suscripción`);
    }

    console.log('💾 Guardando transacción en base de datos');

    const nuevaTransaccion = await transaccion.create({
      idUsuario,
      idSuscripcion: nuevaSuscripcionId,
      monto: montoPago ?? 0,
      metodoPago: metodoPago ?? '',
      estado: estadoPago ?? '',
      referenciaExterna: paymentId.toString(),
      fecha: new Date(),
    });

    console.log('✅ Transacción registrada correctamente:', nuevaTransaccion);

    res.status(201).send('Webhook procesado correctamente');
  } catch (error: any) {
    console.error('❌ Error al procesar webhook:', error);
    res.status(500).send('Error interno al procesar webhook');
  }
};