import express from 'express';
import { limpiarTokensExpirados } from '../controllers/admin.controller.js';

const router = express.Router();

// Puedes agregar seguridad más adelante si lo deseas
router.post('/limpiar-tokens', limpiarTokensExpirados);

export default router;