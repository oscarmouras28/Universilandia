import express from 'express'
import { getusuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js'

const router = express.Router()

router.post('/register', createUsuario)
router.get('/XD', getusuarios)
router.delete('/delete/:id', deleteUsuario)
router.put('/update/:id', updateUsuario)
router.get('/getUser/:id', getUsuarioById)  
export default router
