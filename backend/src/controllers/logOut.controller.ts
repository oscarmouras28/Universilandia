import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { tokenInvalidado } from '../models/tokenInvalidado.js';

const SECRET_KEY = process.env.SECRET_KEY || 'supersecreto';

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(400).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded || !decoded.exp) {
      res.status(400).json({ error: 'Token inválido o sin expiración' });
      return;
    }

    const expiracion = new Date(decoded.exp * 1000); // JWT exp viene en segundos

    await tokenInvalidado.create({
      token,
      expiracion
    });

    res.status(200).json({ message: 'Sesión cerrada. Token invalidado correctamente.' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ error: 'Error interno al cerrar sesión' });
  }
};