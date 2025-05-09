import type { Request, Response } from 'express';
import sequelize from '../config/db.js'; // ajusta si tu archivo se llama distinto

export const limpiarTokensExpirados = async (_req: Request, res: Response): Promise<void> => {
  try {
    await sequelize.query(`
      DELETE FROM dbo.TokenInvalidado
      WHERE expiracion < GETDATE()
    `);
    res.status(200).json({ message: '✅ Tokens expirados eliminados correctamente' });
  } catch (error) {
    console.error('❌ Error al limpiar tokens:', error);
    res.status(500).json({ error: 'Error interno al eliminar tokens expirados' });
  }
};