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
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogPost = await blog.findByPk(req.params.id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).json({ error: 'Blog no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el blog' });
  }
};
