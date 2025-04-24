import 'dotenv/config';
import { MercadoPagoConfig } from 'mercadopago';

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export default mp;