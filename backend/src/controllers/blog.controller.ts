import type { Request, Response } from 'express';
import { blog } from '../models/blog.js'; // Asegúrate de usar la ruta correcta
import { validationResult } from 'express-validator'; 

//listar, obtener por ID los demas se hacen por BD.

//listar todos los blogs
export const getblogs = async (req: Request, res: Response) => {
  try {
    const blogs = await blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener y listar los blogs' });
  }
};

// Obtener un blog por ID
export const getBlogById = (req: Request, res: Response): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'ID del blog es requerido' });
        return resolve();
      }

      const blogPost = await blog.findByPk(id);
      if (blogPost) {
        res.json(blogPost);
      } else {
        res.status(404).json({ error: 'Blog no encontrado' });
      }
      resolve();
    } catch (error) {
      console.error('Error al obtener el blog:', error);
      res.status(500).json({ error: 'Error al obtener el blog' });
      reject(error);
    }
  });
};
