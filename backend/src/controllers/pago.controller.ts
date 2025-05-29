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
    const result = preference;
    res.status(200).json(result);
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


export const webhookNotificacion = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    console.log('📥 Webhook recibido:', JSON.stringify(body, null, 2));

    if (body.type !== 'payment') {
      res.status(200).send('Evento ignorado (no es de tipo payment)');
      return;
    }

    const paymentId = body.data.id;
    const paymentClient = new Payment(mp);

    const pago = await paymentClient.get({ id: paymentId });

    const estadoPago = pago.status;
    const montoPago = pago.transaction_amount;
    const metodoPago = pago.payment_method_id;
    const idUsuario = pago.external_reference;

    console.log(`🔍 Estado del pago (webhook): ${estadoPago}`);

    // Validar que tengamos idUsuario antes de continuar
    if (!idUsuario) {
      console.error('❌ No se recibió external_reference (idUsuario) en el pago');
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

    let nuevaSuscripcionId: string | undefined = undefined;

    if (estadoPago === 'approved') {
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

      console.log(`✅ Suscripción creada desde webhook: ${nuevaSuscripcionId}`);
    }

    await transaccion.create({
      idUsuario,
      idSuscripcion: nuevaSuscripcionId,
      monto: montoPago ?? 0,
      metodoPago: metodoPago ?? '',
      estado: estadoPago ?? '',
      referenciaExterna: paymentId.toString(),
      fecha: new Date(),
    });

    res.status(201).send('Webhook procesado correctamente');
  } catch (error: any) {
    console.error('❌ Error al procesar webhook:', error);
    res.status(500).send('Error interno al procesar webhook');
  }
};