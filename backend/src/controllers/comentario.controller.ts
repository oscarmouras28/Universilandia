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
export const crearComentario = async (req: RequestConUsuario, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { contenido, idBlog } = req.body;
  const usuarioId = req.usuario?.idUsuario;

  if (!uuidValidate(idBlog)) return res.status(400).json({ error: "ID de blog inválido" });

  try {
    const Blog = await blog.findByPk(idBlog);
    if (!Blog) return res.status(404).json({ error: "Blog no encontrado" });

    const nuevoComentario = await comentario.create({
      contenido: contenido.trim(),
      idBlog,
      idUsuario: usuarioId!,
    });

    return res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("Error al crear comentario:", error);
    return res.status(500).json({ error: "Error interno al crear comentario" });
  }
};

// Obtener comentarios de un blog
export const obtenerComentariosDeBlog = async (req: Request, res: Response) => {
  const { idBlog } = req.params;

  if (!uuidValidate(idBlog)) return res.status(400).json({ error: "ID de blog inválido" });

  try {
    const comentarios = await comentario.findAll({
      where: { idBlog },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    return res.status(500).json({ error: "Error interno al obtener comentarios" });
  }
};

// Editar comentario
export const actualizarComentario = async (req: RequestConUsuario, res: Response) => {
  const { id } = req.params;
  const { contenido } = req.body;
  const usuarioId = req.usuario?.idUsuario;
  const tipoUsuario = req.usuario?.tipoUsuario;

  if (!uuidValidate(id)) return res.status(400).json({ error: "ID inválido" });

  if (!contenido || contenido.trim().length < 5) {
    return res.status(400).json({ error: "Contenido muy corto" });
  }

  try {
    const Comentario = await comentario.findByPk(id);

    if (!Comentario) return res.status(404).json({ error: "Comentario no encontrado" });

    if (Comentario.idUsuario !== usuarioId && tipoUsuario !== 'admin') {
      return res.status(403).json({ error: "No autorizado para editar este comentario" });
    }

    Comentario.contenido = contenido.trim();
    await Comentario.save();

    return res.status(200).json(comentario);
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
    return res.status(500).json({ error: "Error interno al actualizar comentario" });
  }
};

// Eliminar comentario
export const eliminarComentario = async (req: RequestConUsuario, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.usuario?.idUsuario;
  const tipoUsuario = req.usuario?.tipoUsuario;

  if (!uuidValidate(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const Comentario = await comentario.findByPk(id);

    if (!Comentario) return res.status(404).json({ error: "Comentario no encontrado" });

    if (Comentario.idUsuario !== usuarioId && tipoUsuario !== 'admin') {
      return res.status(403).json({ error: "No autorizado para eliminar este comentario" });
    }

    await Comentario.destroy();
    return res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    return res.status(500).json({ error: "Error interno al eliminar comentario" });
  }
};
