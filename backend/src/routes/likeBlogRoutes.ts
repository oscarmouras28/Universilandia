import express from 'express';
import {darLike, quitarLike, } from '../controllers/likeblog.controller.js'
import { verificarToken } from '../middleware/authMiddleware.js';
import {validarLike} from '../middleware/likeBlogMiddleware.js'
import { validarCampos } from '../middleware/validationMiddleware.js'
import { contarLikesPorBlog } from '../controllers/likeblog.controller.js'

const router = express.Router()
//Ruta para agregar un like a un blog 
router.post(
    "/",
    verificarToken, //verifica que el usuario esté autenticado
    validarLike,     // valida que blogId exista y sea UUID
    validarCampos,      // revisa errores de validaciones anteriores
    darLike // controlador que agrega el like al blog   
  );
  
  // Ruta para quitar like a un blog
  router.delete(
    "/:blogId",
    verificarToken,
    validarLike,  // valida que blogId sea UUID y no esté vacío
    validarCampos,
    quitarLike
  );

  router.get(
    "/:idBlog/count",
    validarLike, // reutilizamos validación UUID
    validarCampos, // revisa errores de validaciones anteriores
    contarLikesPorBlog // controlador que cuenta los likes del blog
  );
  
  export default router;