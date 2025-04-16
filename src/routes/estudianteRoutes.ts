import express from 'express';
import { createEstudiante, getEstudiantes,getEstudainteId, updateEstudiante } from '../controllers/estudiante.controller.js';

const router = express.Router()

router.post('/register', createEstudiante);
router.get('/listar', getEstudiantes);
router.get('/getEstudianteId/:id', getEstudainteId);
router.put('/update/:id', updateEstudiante);

export default router