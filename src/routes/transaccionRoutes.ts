import express from 'express';
import {
  createTransaccion,
  getTransacciones,
  getTransaccionById,
  updateTransaccion,
  deleteTransaccion
} from '../controllers/transaccion.controller.js';

const router = express.Router();

router.post('/crear', createTransaccion);
router.get('/listar', getTransacciones);
router.get('/obtener/:id', getTransaccionById);
router.put('/actualizar/:id', updateTransaccion);
router.delete('/eliminar/:id', deleteTransaccion);

export default router;