import express from 'express'
import {actualizarComentario, crearComentario, eliminarComentario, obtenerComentariosDeBlog} from '../controllers/comentario.controller.js';

const router = express.Router()


router.post('/create', crearComentario);
router.get('/listar', obtenerComentariosDeBlog);
router.delete('/delete/:id', eliminarComentario);
router.get('/getComentario/:id', obtenerComentariosDeBlog); 

export default router;