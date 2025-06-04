import express from 'express';
import {
  confirmarTransaccion
} from '../controllers/transaccion.controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/confirmar', verificarToken, confirmarTransaccion);

export default router;