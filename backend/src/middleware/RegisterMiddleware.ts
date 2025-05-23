import type { Request, Response, NextFunction } from 'express';

export const validarRegisterInput = (req: Request, res: Response, next: NextFunction): void => {
  const { correo, password, tipoUsuario, activo } = req.body;

  // Verificar que existan todos los campos requeridos
  if (!correo || !password || !tipoUsuario) {
    res.status(400).json({ error: 'Correo, contraseña y tipo de usuario son obligatorios' });
    return;
  }

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    res.status(400).json({ error: 'Formato de correo inválido' });
    return;
  }

  // Validar longitud mínima de contraseña
  //La contraseña debe contener una letra mayúscula, una letra minúscula, un número y un carácter especial.

  if (password.length < 6) {
    res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    return;
  }

  // Validar tipoUsuario permitido
  const tiposPermitidos = ['admin','estudiante','orientador'];
  if (!tiposPermitidos.includes(tipoUsuario)) {
    res.status(400).json({ error: `Tipo de usuario inválido. Debe ser uno de: ${tiposPermitidos.join(', ')}` });
    return;
  }

  // Validar que "activo" sea un booleano si se envía
  if (activo !== undefined && typeof activo !== 'boolean') {
    res.status(400).json({ error: 'El campo activo debe ser un valor booleano' });
    return;
  }

  next(); // ✅ Si pasa todas las validaciones, continúa
};
