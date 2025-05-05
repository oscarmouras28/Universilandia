import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const validarCampos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
