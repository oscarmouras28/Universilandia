import type { Request, Response, NextFunction } from 'express';

export const validarLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { correo, password } = req.body;

  // Validar existencia
  if (!correo?.trim() || !password?.trim()) {
    res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    return;
  }

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    res.status(400).json({ error: 'Formato de correo inválido' });
    return;
  }

  // Validar longitud de contraseña
  if (password.length < 6) {
    res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    return;
  }

  // 📌 Aquí mas adelante se podría incluir validación de CAPTCHA en el futuro:
  // if (!req.body.captcha || !validateCaptcha(req.body.captcha)) {
  //   res.status(400).json({ error: 'Captcha inválido' });
  //   return;
  // }

  next();
};


