import express from 'express';
import {getLikesBlog,createLikeBlog,deleteLikeBlog} from '../controllers/likeblog.controller.js'

const router = express.Router()

// Rutas para manejar los likes de los blogs
router.post('/create',createLikeBlog)
router.get('/listar',getLikesBlog)
router.delete('/delete/:id',deleteLikeBlog)


export default router