import type { Request, Response } from 'express';
import { blog } from '../models/blog.js';
import { likeBlog } from '../models/likeBlog.js'; 
import { usuario } from '../models/usuario.js';

//Listar los likes de un blog
export const getLikesBlog = async (req: Request, res: Response) => {
    try {
        const Likeblogs = await likeBlog.findAll();
        res.json({ message: 'Likes obtenidos correctamente', data: Likeblogs });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los likes del blog' });
    }
};

// Obtener un like por ID
// export const getLikeBlogById = async (req: Request, res: Response) => {
//     try {
//         const likeBlog = await blog.findByPk(req.params.idBlog, {
//             include: ['likeBlogs'],
//         });
//         if (likeBlog) {
//             res.json(likeBlog);
//         } else {
//             res.status(404).json({ error: 'Like no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener el like del blog' });
//     }
// };
// Crear un nuevo like
export const createLikeBlog = async (req: Request, res: Response) => {
    try {
        const { idBlog, idUsuario } = req.body;

        const nuevoLikeBlog = await likeBlog.create({
            idBlog,
            idUsuario,
        });
//Un usuario no debe poder dar like a un blog mas de una vez.
        res.status(201).json(nuevoLikeBlog);
    } catch (error: any) {
        console.error('Error al crear el like del blog:', error); 
        res.status(500).json({ error: 'Error al crear el like del blog', detalle: error.message });
    }
};

//eliminar like 
export const deleteLikeBlog = async (req: Request, res: Response) => {
    try {
        const likeBlogPost = await likeBlog.findByPk(req.params.id);
        if (likeBlogPost) {
            await likeBlogPost.destroy();
            res.json({ message: 'Like eliminado' });
        } else {
            res.status(404).json({ error: 'Like no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el like del blog' });
    }
};
// actualizar like
// export const updateLike = async (req: Request, res: Response) => {
//     try {
//         const { idBlog, idUsuario } = req.body;
//         const likeBlogPost = await likeBlog.findByPk(req.params.id);
//         if (likeBlogPost) {
//             likeBlogPost.idBlog = idBlog;
//             likeBlogPost.idUsuario = idUsuario;
//             await likeBlogPost.save();
//             res.json(likeBlogPost);
//         } else {
//             res.status(404).json({ error: 'Like no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al actualizar el like del blog' });
//     }
// };