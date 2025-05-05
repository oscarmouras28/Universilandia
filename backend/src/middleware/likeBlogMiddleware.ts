import type{ Request, Response, NextFunction } from "express";

export const validarLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { blogId } = req.body;

  if (!blogId) {
    res.status(400).json({ error: "El blogId es obligatorio" });
    return;
  }

  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(blogId)) {
    res.status(400).json({ error: "El blogId debe ser un UUID válido" });
    return;
  }

  next();
};


