import type { Request, Response } from 'express';
import mp from '../config/mercadoPago.js';
import { Preference } from 'mercadopago/dist/clients/preference/index.js';

export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const preferenceClient = new Preference(mp);

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: 'premium_001', // ✅ Puedes poner cualquier identificador único
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
      },
    });
    console.log('✅ Preferencia creada:', preference);
    res.status(200).json({ init_point: preference.init_point });
  } catch (error) {
    console.error('❌ Error al crear preferencia de pago:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
};