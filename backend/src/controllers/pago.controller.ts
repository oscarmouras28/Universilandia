import type { Request, Response } from 'express';
import mp from '../config/mercadoPago.js';
import { Preference } from 'mercadopago/dist/clients/preference/index.js';
import { suscripcion } from '../models/suscripcion.js';
import { Op } from 'sequelize';
import { Result } from 'express-validator';

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
          success: 'https://universilandia-backend-592919962120.southamerica-west1.run.app/api/pagos/success',
          failure: 'https://universilandia.cl/failure',
          pending: 'https://universilandia.cl/pending',
        },
        auto_return: 'approved',
        external_reference: idUsuario,
      },
    });
    const result= preference;
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