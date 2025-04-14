import express from 'express'
import { createComentario, getComentarios, updateComentario, deleteComentario,getComentarioById } from '../controllers/comentario.controller.js';

const router = express.Router()


router.post('/create', createComentario);
router.get('/listar', getComentarios);
router.put('/update/:id', updateComentario);
router.delete('/:id', deleteComentario);
router.get('/getComentario/:id', getComentarioById); 

export default router;