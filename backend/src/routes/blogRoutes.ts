import express from 'express'
import {getblogs,getBlogById} from '../controllers/blog.controller.js'



const router = express.Router()

router.get('/listar',getblogs)
router.get('/getBlog/:idBlog',getBlogById)
export default router