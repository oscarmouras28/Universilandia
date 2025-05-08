import type { Request, Response } from "express";
import { likeBlog } from "../models/likeBlog.js";
import { blog } from "../models/blog.js";
import { validate as uuidValidate } from "uuid";



export const darLike = async (req: Request, res: Response): Promise<void> => {
  const { idBlog } = req.body;
  const usuarioId = (req.user as { idUsuario: string })?.idUsuario;

  if (!usuarioId) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  if (!uuidValidate(idBlog)) {
    res.status(400).json({ error: "ID de blog inválido" });
    return;
  }

  try {
    const blogExistente = await blog.findByPk(idBlog);
    if (!blogExistente) {
      res.status(404).json({ error: "Blog no encontrado" });
      return;
    }

    const likeExistente = await likeBlog.findOne({
      where: { idBlog, idUsuario: usuarioId }
    });

    if (likeExistente) {
      res.status(409).json({ error: "Ya diste like a este blog" });
      return;
    }

    await likeBlog.create({ idBlog, idUsuario: usuarioId });

    res.status(201).json({ message: "Like agregado correctamente" });
  } catch (error) {
    console.error("Error al dar like:", error);
    res.status(500).json({ error: "Error interno al dar like" });
  }
};


export const quitarLike = async (req: Request, res: Response): Promise<void>  => {
    const { idBlog } = req.body;
    const usuarioId = (req.user as { idUsuario: string })?.idUsuario;

    if (!usuarioId) {
        res.status(401).json({ error: "Usuario no autenticado" });
        return;
    }

    if (!uuidValidate(idBlog)) {
        res.status(400).json({ error: "ID de blog inválido" });
        return;;
    }

    try {
        const likeExistente = await likeBlog.findOne({
            where: { idBlog, idUsuario: usuarioId }
        });

        if (!likeExistente) {
            res.status(404).json({ error: "No has dado like a este blog" });
            return;
        }

        await likeExistente.destroy();

        res.status(200).json({ message: "Like eliminado correctamente" });
        return;
    } catch (error) {
        console.error("Error al quitar like:", error);
        res.status(500).json({ error: "Error interno al quitar like" });
        return;
    }
};

export const contarLikesPorBlog = async (req: Request, res: Response): Promise<void> => {
    const { idBlog } = req.params;
  
    if (!uuidValidate(idBlog)) {
      res.status(400).json({ error: "ID de blog inválido" });
      return;
    }
  
    try {
      const cantidadLikes = await likeBlog.count({
        where: { idBlog }
      });
  
      res.status(200).json({ idBlog, cantidadLikes });
    } catch (error) {
      console.error("Error al contar likes:", error);
      res.status(500).json({ error: "Error interno al contar likes" });
    }
  };
