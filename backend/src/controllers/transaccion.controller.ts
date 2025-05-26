import type { Request, Response } from 'express';
import mp from '../config/mercadoPago.js';
import { transaccion } from '../models/transaccion.js';
import { suscripcion } from '../models/suscripcion.js';
import { Op } from 'sequelize';
import { Payment } from 'mercadopago/dist/clients/payment/index.js';

export const confirmarTransaccion = async (req: Request, res: Response) => {
  const paymentId = req.body.payment_id;
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;

  if (!paymentId || !idUsuario) {
    res.status(400).json({ error: 'Falta el payment_id o el usuario no está autenticado' });
    return;
  }

  try {
    // Evitar duplicación de transacción
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
    const paymentClient = new Payment(mp);
    const pago = await paymentClient.get({ id: paymentId });
    

    if (pago.status !== 'approved') {
      res.status(200).json({ mensaje: `El pago no está aprobado: ${pago.status}` });
      return;
    }

    // Verificar si ya tiene una suscripción activa
    const hoy = new Date();
    const tieneActiva = await suscripcion.findOne({
      where: {
        idUsuario,
        estado: true,
        fechaTermino: { [Op.gt]: hoy },
      },
    });

    if (tieneActiva) {
      res.status(409).json({
        mensaje: 'Ya tienes una suscripción activa. No se generó una nueva.',
        suscripcion: tieneActiva,
      });
      return;
    }

    // Crear nueva suscripción (30 días)
    const fechaInicio = hoy;
    const fechaFin = new Date();
    fechaFin.setDate(fechaInicio.getDate() + 30);

    const nuevaSuscripcion = await suscripcion.create({
      idUsuario,
      fechaInicio,
      fechaTermino: fechaFin,
      estado: true,
    });

    // Registrar transacción
    const nuevaTransaccion = await transaccion.create({
      idUsuario,
      idSuscripcion: nuevaSuscripcion.idSuscripcion,
      monto: pago.transaction_amount?? 0,
      metodoPago: pago.payment_method_id??'desconocido',
      estado: pago.status,
      referenciaExterna: pago.id?.toString()??'sin-id',
      fecha: new Date(pago.date_created?? Date.now()),
    });

    res.status(201).json({
      mensaje: 'Pago confirmado, suscripción activa y transacción registrada',
      suscripcion: nuevaSuscripcion,
      transaccion: nuevaTransaccion,
    });

  } catch (error: any) {
    console.error('❌ Error al confirmar y registrar transacción:', error);
    res.status(500).json({ error: 'Error interno al procesar el pago', 'detalle': error.message });
  }
};