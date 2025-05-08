import type{ Request, Response, NextFunction } from "express";

export const validarLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const idBlog = req.body.idBlog || req.params.idBlog;

  if (!idBlog) {
    res.status(400).json({ error: "El idBlog es obligatorio" });
    return;
  }

  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(idBlog)) {
    res.status(400).json({ error: "El blogId debe ser un UUID válido" });
    return;
  }

  next();
};



