import express from 'express';
import { crearPreferencia } from '../controllers/pago.controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';
import { confirmarTransaccion } from '../controllers/transaccion.controller.js';

const router = express.Router();

router.post('/crear-preferencia',verificarToken, crearPreferencia);
router.post('/success',confirmarTransaccion);
export default router;