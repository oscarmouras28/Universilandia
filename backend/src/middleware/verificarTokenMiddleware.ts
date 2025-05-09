import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenInvalidado } from '../models/tokenInvalidado.js';

const SECRET_KEY = process.env.SECRET_KEY || 'supersecreto';

export const verificarToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  // ✅ Verificar si el token fue invalidado
  const tokenNegado = await tokenInvalidado.findByPk(token);
  if (tokenNegado) {
    res.status(401).json({ error: 'Token inválido. Sesión cerrada.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};