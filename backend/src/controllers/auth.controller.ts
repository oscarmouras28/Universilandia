import type { Request, Response } from 'express';
import { usuario } from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'supersecreto';

// Función para registrar un nuevo usuario
//Login User Controller 

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { correo, password } = req.body;

  try {
    const user = await usuario.findOne({ where: { correo } });

    if (!user) {
      res.status(401).json({ error: 'No se puede encontrar el Usuario Prueba' });
      return;
    }

    if (!user.activo) {
      res.status(403).json({ error: 'Usuario inactivo. Contacte a un administrador.' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign(
      {
        idUsuario: user.idUsuario,
        correo: user.correo,
        tipoUsuario: user.tipoUsuario,
      },
      SECRET_KEY,
      { expiresIn: '4h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id: user.idUsuario,
        correo: user.correo,
        tipo: user.tipoUsuario,
      },
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  }
};