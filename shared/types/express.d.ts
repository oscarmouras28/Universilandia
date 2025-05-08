import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        idUsuario: string;
        tipoUsuario: string;
      };
    }
  }
}
export {};