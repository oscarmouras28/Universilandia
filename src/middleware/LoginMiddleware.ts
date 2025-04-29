import type { Request, Response, NextFunction } from 'express';

export const validarLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { correo, password } = req.body;

  // Validar existencia de campos
  if (!correo || !password) {
    res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    return;
  }

  // Validar formato del correo, basicamente que tenga un @ y un .
  // Esto es una validación básica.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    res.status(400).json({ error: 'Formato de correo inválido' });
    return;
  }

  // Validar longitud mínima de contraseña
  if (password.length < 6) {
    res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    return;
  }

  next(); // ✅ Si todo está bien, sigue al controlador loginUser que seria auth.controller.ts
};
