import express from 'express'
import { getusuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js'
import { loginUser } from '../controllers/auth.controller.js'
import { verificarToken, esAdmin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/register', createUsuario)
router.get('/listar', verificarToken, getusuarios)
router.delete('/delete/:id', deleteUsuario)
router.put('/update/:id',verificarToken ,esAdmin, updateUsuario)
router.get('/getUser/:id', getUsuarioById)
router.post('/login', loginUser)
export default router
