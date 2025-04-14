import express from 'express';
import {getLikesBlog,getLikeBlogById,createLikeBlog,deleteLikeBlog,updateLike} from '../controllers/likeblog.controller.js'

const router = express.Router()

// Rutas para manejar los likes de los blogs
router.post('/create',createLikeBlog)
router.get('/listar',getLikesBlog)
router.delete('/delete/:id',deleteLikeBlog)
router.put('/update/:id',updateLike)
router.get('/getLike/:id',getLikeBlogById)
export default router