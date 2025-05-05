// 🔵 Cargamos las variables de entorno
import 'dotenv/config';

// 🔵 Importamos MercadoPagoConfig desde el SDK oficial de MercadoPago
import { MercadoPagoConfig } from 'mercadopago';

// 🔵 Instanciamos la configuración de Mercado Pago
// Usamos el token secreto que está en las variables de entorno (.env)
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!, // El signo ! indica que asumimos que existe
});

// 🔵 Exportamos la instancia configurada
// Así otros archivos pueden usar `mp` para interactuar con Mercado Pago
export default mp;