import type { Request, Response } from 'express';
import { estudiante } from '../models/estudiante.js'; 
import { usuario } from '../models/usuario.js';

//actualizar el estudiante
export const updateEstudiante = async (req: Request, res: Response) => {
    try {
        const Estudiante = await estudiante.findByPk(req.params.id);
        if (Estudiante) {
            await Estudiante.update(req.body);
            res.json(Estudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};
// agregar un estudiante
export const createEstudiante = async (req: Request, res: Response) => {
    try {
        const { telefono, primerNombre, segundoNombre, apellidoMaterno, apellidoPaterno, rut, fechaNacimiento, idUsuario, idColegio, idNivelEducacional } = req.body;
        
        const nuevoEstudiante = await estudiante.create({
            telefono,
            primerNombre,
            segundoNombre,
            apellidoMaterno,
            apellidoPaterno,
            rut,
            fechaNacimiento,
            idUsuario,
            idColegio,
            idNivelEducacional,
        });
        res.status(201).json(nuevoEstudiante);
    } catch (error: any) {
        console.error('Error al crear el estudiante:', error); 
        res.status(500).json({ error: 'Error al crear el estudiante', detalle: error.message });
    }
};

// Listar todos los estudiantes
export const getEstudiantes = async (req: Request, res: Response) => {
    try {
        const estudiantes = await estudiante.findAll({
            include: ['usuario'],
        });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};