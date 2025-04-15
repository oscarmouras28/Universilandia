import express from 'express';
import { createEstudiante, getEstudiantes, updateEstudiante } from '../controllers/estudiante.controller.js';

const router = express.Router()

router.post('/register', createEstudiante);
router.get('/listar', getEstudiantes);
router.get('/getEstudiante/:id', getEstudiantes);
router.put('/update/:id', updateEstudiante);

export default router