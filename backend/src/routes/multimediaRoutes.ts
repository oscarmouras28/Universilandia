import { Router } from 'express';
import { obtenerMultimedia } from '../controllers/multimedia.Controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

// Ruta protegida para obtener multimedia con URL firmada
router.get('/:id', verificarToken, obtenerMultimedia);

export default router;