import { Request, Response } from 'express';
import { usuario } from '../models/usuario.js'; // Asegúrate de usar la ruta correcta

// Listar todos los usuarios
export const getusuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const Usuario = await usuario.findByPk(req.params.id);
    if (Usuario) {
      res.json(Usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = await usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario existente
export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const Usuario = await usuario.findByPk(req.params.id);
    if (Usuario) {
      await Usuario.update(req.body);
      res.json(Usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const Usuario = await usuario.findByPk(req.params.id);
    if (Usuario) {
      await Usuario.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
