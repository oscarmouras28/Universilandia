import type { Request, Response } from "express";
import { comentario } from "../models/comentario.js";
import { blog } from "../models/blog.js";
import { validationResult } from "express-validator";
import { validate as uuidValidate } from "uuid";
import { usuario } from "../models/usuario.js";
import { estudiante } from "../models/estudiante.js";

//mas adelante agregar validacion de que el usuario siempre tiene que estar activo.
// Crear comentario
export const crearComentario = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { contenido, idBlog } = req.body;
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;

  if (!idUsuario) {
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
      idUsuario,
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res.status(500).json({ error: "Error interno al crear comentario" });
  }
};

// Obtener comentarios de un blog
// Se pueden agregar los tipos de usuarios para retornaar en el frontend.
export const obtenerComentariosDeBlog = async (req: Request, res: Response): Promise<void> => {
  const { idBlog } = req.params;

  if (!uuidValidate(idBlog)) {
    res.status(400).json({ error: "ID de blog inválido" });
    return;
  }

  try {
    const comentarios = await comentario.findAll({
      where: { idBlog },
      order: [["fechaCreacion", "DESC"]],
    });

    const comentariosConUsuario = await Promise.all(
      comentarios.map(async (comentarioItem) => {
        const user = await usuario.findByPk(comentarioItem.idUsuario, {
          attributes: ["correo", "tipoUsuario"],
        });

        const estudianteData = await estudiante.findOne({
          where: { idUsuario: comentarioItem.idUsuario },
          attributes: ["primerNombre", "apellidoPaterno"],
        });

        return {
          ...comentarioItem.toJSON(),
          usuario: user ? user.toJSON() : null,
          nombreEstudiante: estudianteData
            ? `${estudianteData.primerNombre} ${estudianteData.apellidoPaterno}`
            : null,
        };
      })
    );

    res.status(200).json(comentariosConUsuario);
  } catch (error) {
    console.error("Error al obtener comentarios:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Error interno al obtener comentarios" });
  }
};



// Editar comentario
export const actualizarComentario = async (req: Request, res: Response): Promise<void> => {
  const { idComentario } = req.params;
  const { contenido } = req.body;
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;
  const tipoUsuario = (req.user as { tipoUsuario: string })?.tipoUsuario;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!idUsuario) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  if (!uuidRegex.test(idComentario)) {
    res.status(400).json({ error: "ID de comentario inválido" });
    return;
  }

  if (!contenido || contenido.trim().length < 5) {
    res.status(400).json({ error: "Contenido muy corto" });
    return;
  }
//validacion nueva del modelo comentario. 
  if (!comentario || typeof comentario.findByPk !== 'function') {
    console.error("❌ Modelo 'comentario' no está bien cargado");
    res.status(500).json({ error: "Error interno de servidor (modelo comentario no cargado)" });
    return;
  }
  try {
    const Comentario = await comentario.findByPk(idComentario);
    if (!Comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    if (Comentario.idUsuario !== idUsuario && tipoUsuario !== "admin") {
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
export const eliminarComentario = async (req: Request, res: Response): Promise<void> => {
  const { idComentario } = req.params;
  const idUsuario = (req.user as { idUsuario: string })?.idUsuario;
  const tipoUsuario = (req.user as { tipoUsuario: string })?.tipoUsuario;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!idUsuario) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  if (!uuidRegex.test(idComentario)) {
    res.status(400).json({ error: "ID de comentario inválido" });
    return;
  }

  if (!comentario || typeof comentario.findByPk !== 'function') {
    console.error("❌ Modelo 'comentario' no está bien cargado");
    res.status(500).json({ error: "Error interno de servidor (modelo comentario no cargado)" });
    return;
  }

  try {
    const Comentario = await comentario.findByPk(idComentario);
    if (!Comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    if (Comentario.idUsuario !== idUsuario && tipoUsuario !== "admin") {
      res.status(403).json({ error: "No autorizado para eliminar este comentario" });
      return;
    }

    await Comentario.destroy();

    res.status(200).json({ mensaje: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error interno al eliminar comentario" });
  }
};