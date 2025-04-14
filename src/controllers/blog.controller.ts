import type { Request, Response } from 'express';
import { blog } from '../models/blog.js'; // Asegúrate de usar la ruta correcta

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

// Crear un nuevo blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { contenido } = req.body;

    const nuevoBlog = await blog.create({
      contenido,
    });

    res.status(201).json(nuevoBlog);
  } catch (error: any) {
    console.error('Error al crear el blog:', error); 
    res.status(500).json({ error: 'Error al crear el blog', detalle: error.message });
  }
};

// Actualizar un blog existente

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogPost = await blog.findByPk(req.params.id);
    if (blogPost) {
      await blogPost.update(req.body);
      res.json(blogPost);
    } else {
      res.status(404).json({ error: 'Blog no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el blog' });
  }
};