import type { Request, Response } from 'express';
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


export const createUsuario = async (req: Request, res: Response) => {
  console.log('📥 Datos recibidos:', req.body);

  try {
    const { correo, password, tipoUsuario, activo } = req.body;

    // 1. Construye el usuario (sin guardar aún)
    const nuevoUsuario = usuario.build({
      correo,
      password: Buffer.from(password),
      tipoUsuario,
      activo
    });

    console.log('🛠️ Usuario construido (antes de guardar):', nuevoUsuario.toJSON());

    // 2. Guarda el usuario en la BD
    await nuevoUsuario.save();

    console.log('✅ Usuario guardado exitosamente');
    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    console.error('❌ Error al guardar el usuario:', error);
    res.status(500).json({
      error: 'Error al crear el usuario',
      detalles: error.message,
      stack: error.stack
    });
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
