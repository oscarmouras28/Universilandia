import express from 'express'
import {createBlog,getblogs,getBlogById,updateBlog,deleteBlog} from '../controllers/blog.controller.js'


const router = express.Router()

router.post('/register',createBlog)
router.get('/listar',getblogs)
router.delete('/delete/:id',deleteBlog)
router.put('/update/:id',updateBlog)
router.get('/getBlog/:id',getBlogById)
export default router