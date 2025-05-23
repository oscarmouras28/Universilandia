import express from 'express';
import { crearPreferencia } from '../controllers/pago.controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/crear-preferencia',verificarToken, crearPreferencia);
export default router;