import express from 'express';
import { crearPreferencia, webhookNotificacion } from '../controllers/pago.controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/crear-preferencia',verificarToken, crearPreferencia);
// router.post('/webhook', webhookNotificacion);
//router.post('/webhook', express.raw({ type: 'application/json' }), webhookNotificacion);

export default router;