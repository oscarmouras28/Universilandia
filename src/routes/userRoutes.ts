import express from 'express'
import { getusuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js'
import { loginUser } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', createUsuario)
router.get('/listar', getusuarios)
router.delete('/delete/:id', deleteUsuario)
router.put('/update/:id', updateUsuario)
router.get('/getUser/:id', getUsuarioById)
router.post('/login', loginUser)
export default router
