import type { Request, Response } from 'express';
import mp from '../config/mercadoPago.js';
import { transaccion } from '../models/transaccion.js';
import { suscripcion } from '../models/suscripcion.js';
import { Payment } from 'mercadopago/dist/clients/payment/index.js';
import { Op } from 'sequelize';

export const confirmarTransaccion = async (req: Request, res: Response) => {
  const paymentId = req.body.payment_id;
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;

  if (!paymentId || !idUsuario) {
    res.status(400).json({ error: 'Falta el payment_id o el usuario no está autenticado' });
    return;
  }

  try {
    const paymentClient = new Payment(mp);

    // Verificar si ya existe una transacción registrada
    const existente = await transaccion.findOne({
      where: { referenciaExterna: paymentId.toString() },
    });

    if (existente) {
      res.status(409).json({
        mensaje: 'La transacción ya está registrada',
        transaccion: existente,
      });
      return;
    }

    // Obtener el estado del pago desde MercadoPago
    const pago = await paymentClient.get({ id: paymentId });
    const estadoPago = pago.status;
    const montoPago = pago.transaction_amount;
    const metodoPago = pago.payment_method_id;

    console.log(`🔍 Estado del pago: ${estadoPago}`);

    let nuevaSuscripcionId: string | null = null;

    // Si está aprobado, crear suscripción
    if (estadoPago === 'approved') {
      const hoy = new Date();
      const fechaFin = new Date();
      fechaFin.setDate(hoy.getDate() + 30); // 30 días de suscripción

      const nuevaSuscripcion = await suscripcion.create({
        idUsuario,
        fechaInicio: hoy,
        fechaTermino: fechaFin,
        estado: true,
      });

      nuevaSuscripcionId = nuevaSuscripcion.idSuscripcion;

      console.log(`✅ Suscripción creada: ${nuevaSuscripcionId}`);
    }

    // Registrar la transacción (independientemente del estado)
    const nuevaTransaccion = await transaccion.create({
      idUsuario,
      idSuscripcion: nuevaSuscripcionId ?? undefined,
      monto: Number(montoPago) || 0,
      metodoPago: metodoPago ?? '',
      estado: estadoPago ?? '',
      referenciaExterna: paymentId.toString(),
      fechaPago: new Date(), // ✅ este sí es un objeto Date válido
    });

    res.status(201).json({
      mensaje: 'Transacción registrada correctamente',
      estado: estadoPago,
      suscripcion: nuevaSuscripcionId ? 'Activa' : 'No creada (pago no aprobado)',
      transaccion: nuevaTransaccion,
    });

  } catch (error: any) {
    console.error('❌ Error al confirmar y registrar transacción:', error);
    res.status(500).json({ error: 'Error interno al procesar el pago', detalle: error.message });
  }
};
