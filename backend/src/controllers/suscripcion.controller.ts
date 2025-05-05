import type { Request, Response } from 'express';
import { suscripcion } from '../models/suscripcion.js'; // Asegúrate de usar la ruta correcta

//listar suscripciones
export const getSuscripciones = async (req: Request, res: Response) => {
    try {
        const suscripciones = await suscripcion.findAll();
        res.json(suscripciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener y listar las suscripciones' });
    }
};

//crear suscripcion
export const createSuscripcion = async (req: Request, res: Response) => {
    try {
        const { fechaInicio,idUsuario,fechaTermino,estado } = req.body;

        const nuevaSuscripcion = await suscripcion.create({
            fechaInicio,
            fechaTermino,
            estado,
            idUsuario,
        });

        res.status(201).json(nuevaSuscripcion);
    } catch (error: any) {
        console.error('Error al crear la suscripción:', error); 
        res.status(500).json({ error: 'Error al crear la suscripción', detalle: error.message });
    }
};

//actualizar suscripcion
export const updateSuscripcion = async (req: Request, res: Response) => {
    try {
        const Suscripcion = await suscripcion.findByPk(req.params.id);
        if (Suscripcion) {
            await Suscripcion.update(req.body);
            res.json(Suscripcion);
        } else {
            res.status(404).json({ error: 'Suscripción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la suscripción' });
    }
};