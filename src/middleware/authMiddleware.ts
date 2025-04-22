import type { Request, Response, NextFunction } from 'express';
import type { JwtPayloadCustom } from '../types/jwt'; // ajusta la ruta según tu estructura
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'supersecreto';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayloadCustom; // Asegúrate de que req.user tenga el tipo correcto
  if (user?.tipoUsuario !== 'admin') {
//     Property 'tipoUsuario' does not exist on type 'string | JwtPayload'.
//   Property 'tipoUsuario' does not exist on type 'string'.ts(2339)
// any
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
};
