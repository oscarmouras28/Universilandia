import express from 'express';
import { createSuscripcion, getSuscripciones, updateSuscripcion } from '../controllers/suscripcion.controller.js';

const router = express.Router()
router.post('/register', createSuscripcion);
router.get('/listar', getSuscripciones);
router.put('/update/:id', updateSuscripcion);


export default router