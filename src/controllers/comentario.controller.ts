import type { Request, Response } from 'express';
import { comentario } from '../models/comentario.js'; // Asegúrate de usar la ruta correcta

//listar comentarios
export const getComentarios = async (req: Request, res: Response) => {
    try {
        const comentarios = await comentario.findAll();
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener y listar los comentarios' });
    }
};

// Obtener un comentario por ID
export const getComentarioById = async (req: Request, res: Response) => {
    try {
        const Comentario = await comentario.findByPk(req.params.id);
        if (Comentario) {
            res.json(Comentario);
            res.json({ message: 'Comentario encontrado con exito' });
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el comentario' });
    }
};

// Crear un nuevo comentario

export const createComentario = async (req: Request, res: Response) => {
    try {
        const { idBlog, idUsuario, contenido } = req.body;

        const nuevoComentario = await comentario.create({
            idBlog,
            idUsuario,
            contenido,
        });

        res.status(201).json(nuevoComentario);
    } catch (error: any) {
        console.error('Error al crear el comentario:', error); 
        res.status(500).json({ error: 'Error al crear el comentario', detalle: error.message });
    }
};
// Actualizar un comentario existente
export const updateComentario = async (req: Request, res: Response) => {
    try {
        const Comentario = await comentario.findByPk(req.params.id);
        if (Comentario) {
            await Comentario.update(req.body);
            res.json(Comentario);
            res.json({ message: 'Comentario actualizado con exito' });
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el comentario' });
    }
};
// Eliminar un comentario existente
export const deleteComentario = async (req: Request, res: Response) => {
    try {
        const Comentario = await comentario.findByPk(req.params.id);
        if (Comentario) {
            await Comentario.destroy();
            res.json({ message: 'Comentario eliminado' });
        } else {
            res.status(404).json({ error: 'Comentario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
};