import type { Request, Response } from 'express';
import { usuario } from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.SECRET_KEY || 'supersecreto';

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { correo, password } = req.body;

  try {
    const user = await usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password.toString());

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
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

    return res.status(200).json({
      token,
      usuario: {
        id: user.idUsuario,
        correo: user.correo,
        tipo: user.tipoUsuario,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al iniciar sesión', detalle: err.message });
  }
};