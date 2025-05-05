import type { Request, Response } from "express";
import { comentario } from "../models/comentario.js";
import { blog } from "../models/blog.js";
import { validationResult } from "express-validator";
import { validate as uuidValidate } from "uuid";

interface RequestConUsuario extends Request {
  usuario?: {
    idUsuario: string;
    tipoUsuario: string;
  };
}

// Crear comentario
export const crearComentario = async (req: RequestConUsuario, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { contenido, idBlog } = req.body;
  const usuarioId = req.usuario?.idUsuario;

  if (!usuarioId) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  if (!uuidValidate(idBlog)) {
    res.status(400).json({ error: "ID de blog inválido" });
    return;
  }

  try {
    const Blog = await blog.findByPk(idBlog);
    if (!Blog) {
      res.status(404).json({ error: "Blog no encontrado" });
      return;
    }

    const nuevoComentario = await comentario.create({
      contenido: contenido.trim(),
      idBlog,
      idUsuario: usuarioId,
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res.status(500).json({ error: "Error interno al crear comentario" });
  }
};

// Obtener comentarios de un blog
export const obtenerComentariosDeBlog = async (req: Request, res: Response): Promise<void> => {
  const { idBlog } = req.params;

  if (!uuidValidate(idBlog)) {
    res.status(400).json({ error: "ID de blog inválido" });
    return;
  }

  try {
    const comentarios = await comentario.findAll({
      where: { idBlog },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error interno al obtener comentarios" });
  }
};

// Editar comentario
export const actualizarComentario = async (req: RequestConUsuario, res: Response): Promise<void> => {
  const { id } = req.params;
  const { contenido } = req.body;
  const usuarioId = req.usuario?.idUsuario;
  const tipoUsuario = req.usuario?.tipoUsuario;

  if (!uuidValidate(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  if (!contenido || contenido.trim().length < 5) {
    res.status(400).json({ error: "Contenido muy corto" });
    return;
  }

  try {
    const Comentario = await comentario.findByPk(id);
    if (!Comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    if (Comentario.idUsuario !== usuarioId && tipoUsuario !== "admin") {
      res.status(403).json({ error: "No autorizado para editar este comentario" });
      return;
    }

    Comentario.contenido = contenido.trim();
    await Comentario.save();

    res.status(200).json(Comentario);
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
    res.status(500).json({ error: "Error interno al actualizar comentario" });
  }
};

// Eliminar comentario
export const eliminarComentario = async (req: RequestConUsuario, res: Response): Promise<void> => {
  const { id } = req.params;
  const usuarioId = req.usuario?.idUsuario;
  const tipoUsuario = req.usuario?.tipoUsuario;

  if (!uuidValidate(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const Comentario = await comentario.findByPk(id);
    if (!Comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    if (Comentario.idUsuario !== usuarioId && tipoUsuario !== "admin") {
      res.status(403).json({ error: "No autorizado para eliminar este comentario" });
      return;
    }

    await Comentario.destroy();
    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error interno al eliminar comentario" });
  }
};