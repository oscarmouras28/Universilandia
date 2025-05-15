import express from 'express'
import {actualizarComentario, crearComentario, eliminarComentario, obtenerComentariosDeBlog} from '../controllers/comentario.controller.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router()


router.post('/create',verificarToken, crearComentario);
router.get('/listar/:idBlog',verificarToken, obtenerComentariosDeBlog);
router.delete('/delete/:idComentario',verificarToken, eliminarComentario);
router.put('/update/:idComentario',verificarToken, actualizarComentario);

export default router;