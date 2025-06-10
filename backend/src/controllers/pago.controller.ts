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
            description: 'Acceso a contenido exclusivo de Universilandia por 30 días',
            quantity: 1,
            unit_price: 200,//precio de la suscripción en CLP
            currency_id: 'CLP',
            category_id: 'services',
          },
        ],
        payer: {
          name: 'Oscar',
          surname: 'Mouras',
        },
        back_urls: {
          success: 'https://universilandia.cl/success',
          failure: 'https://universilandia.cl/failure',
          pending: 'https://universilandia.cl/pending',
        },
        auto_return: 'approved',
        external_reference: idUsuario.toString(),
        notification_url: 'https://universilandia-backend-592919962120.southamerica-west1.run.app/api/pagos/webhook',
      },
    });
    console.log('✅ Preferencia creada (init_point):', preference.init_point);
    res.status(200).json({ init_point: preference.init_point });


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
  let paymentId: string | undefined;
  let tipoEvento: string | undefined;

  try {
    // Soporte tanto para body como para query string
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
      const rawBody = req.body;
      const body = Buffer.isBuffer(rawBody) ? JSON.parse(rawBody.toString()) : rawBody;
      console.log('rawBody:', rawBody)
      console.log('body:', body)

      console.log('📥 Webhook RAW body:', JSON.stringify(body, null, 2));
      tipoEvento = body.type;
      paymentId = body.data?.id;
    } else {
      // fallback para GET o POST con query
      tipoEvento = req.query.type as string;
      paymentId = req.query['data.id'] as string;
      console.log(`📥 Webhook vía query: type=${tipoEvento}, id=${paymentId}`);
    }

    if (tipoEvento !== 'payment') {
      console.log('⚠️ Evento ignorado (no es de tipo payment)');
      res.status(200).send('Evento ignorado');
      return;
    }

    if (!paymentId || paymentId === '123456') {
      console.log('⚠️ ID inválido o simulado');
      res.status(200).send('ID inválido');
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
      console.log('❌ No se recibió external_reference');
      res.status(400).send('Falta external_reference');
      return;
    }

    const yaExiste = await transaccion.findOne({
      where: { referenciaExterna: paymentId.toString() },
    });

    if (yaExiste) {
      console.log('⚠️ Transacción duplicada');
      res.status(200).send('Ya procesada');
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
      console.log(`✅ Suscripción creada con ID: ${nuevaSuscripcionId}`);
    } else {
      console.log(`⚠️ Pago con estado: ${estadoPago}, no se crea suscripción`);
    }
    console.log('📌 Detalle de rechazo:', pago.status_detail);
    console.log(idUsuario, nuevaSuscripcionId, montoPago, metodoPago, estadoPago, paymentId);
    await transaccion.create({
      idUsuario,
      idSuscripcion: nuevaSuscripcionId,
      monto: montoPago ?? 0,
      metodoPago: metodoPago ?? '',
      estado: estadoPago ?? '',
      referenciaExterna: paymentId.toString(),
      fechaPago: new Date(),
    });

    console.log('💾 Transacción registrada');
    res.status(201).send('Procesado con éxito');
  } catch (error: any) {
    console.error('❌ Error al procesar webhook:', error);
    res.status(500).send('Error interno');
  }
};
