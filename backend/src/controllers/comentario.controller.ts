import type { Request, Response } from "express";
import { comentario } from "../models/comentario.js";
import { blog } from "../models/blog.js";
import { validationResult } from "express-validator";
import { validate as uuidValidate } from "uuid";
import { usuario } from "../models/usuario.js";
import { estudiante } from "../models/estudiante.js";
import { comentario_auditoria } from "../models/comentarioAuditoria.js";

import { Sequelize } from 'sequelize';
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
      activo: true,
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res.status(500).json({ error: "Error interno al crear comentario" });
  }
};

// Obtener comentarios de un blog
//listar comentarios 
// Se pueden agregar los tipos de usuarios para retornaar en el frontend.
export const obtenerComentariosDeBlog = async (req: Request, res: Response): Promise<void> => {
  const { idBlog } = req.params;

  if (!uuidValidate(idBlog)) {
    res.status(400).json({ error: "ID de blog inválido" });
    return;
  }

  try {
    const comentarios = await comentario.findAll({
      where: {
        idBlog,
        activo: true // 👈 FILTRO CLAVE
      },
      order: [['fechaCreacion', 'DESC']]
    });


    const comentariosConUsuario = await Promise.all(
      comentarios.map(async (comentarioItem) => {
        const user = await usuario.findByPk(comentarioItem.idUsuario, {
          attributes: ["correo", "tipoUsuario"],
        });

        let nombreMostrado = null;
        if (user) {
          if (user.tipoUsuario === 'admin') {
            nombreMostrado = "usuario admin";
          } else {
            const estudianteData = await estudiante.findOne({
              where: { idUsuario: comentarioItem.idUsuario },
              attributes: ["primerNombre", "apellidoPaterno"],
            });
            nombreMostrado = estudianteData
              ? `${estudianteData.primerNombre} ${estudianteData.apellidoPaterno}`
              : null;
          }
        }

        return {
          ...comentarioItem.toJSON(),
          usuario: user ? user.toJSON() : null,
          nombreEstudiante: nombreMostrado,
        };
      })
    );

    res.status(200).json(comentariosConUsuario);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
  const motivo = req.body.motivo || null;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!idUsuario) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  if (!uuidRegex.test(idComentario)) {
    res.status(400).json({ error: "ID de comentario inválido" });
    return;
  }

  try {
    const Comentario = await comentario.findByPk(idComentario);

    if (!Comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }
//Si el id del usuario que intenta eliminar el comentario no es el mismo que el del JWT no puede eliminar. 
//Si el usuario no es admin entonces no puede eliminar el comentario.
    if (Comentario.idUsuario !== idUsuario && tipoUsuario !== "admin") {
      res.status(403).json({ error: "No autorizado para eliminar este comentario" });
      return;
    }

    // Registrar auditoría antes del "borrado"
    await comentario_auditoria.create({
      idComentario: Comentario.idComentario,
      idUsuario,
      contenidoOriginal: Comentario.contenido,
      motivo
    });

    // Soft delete
    Comentario.activo = false;
    await Comentario.save();

    res.status(200).json({ mensaje: "Comentario eliminado correctamente Soft Delete" });
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error interno al eliminar comentario" });
  }
}; 
