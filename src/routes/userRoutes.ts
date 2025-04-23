import express from 'express'
import { getusuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario} from '../controllers/usuario.controller.js'
import { loginUser } from '../controllers/auth.controller'
import { verificarToken } from '../middleware/authMiddleware.js'


const router = express.Router()

// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'Application<Record<string, any>>'.
//       Type '(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<...>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.ts(2769)
// index.d.ts(168, 5): The last overload is declared here.
// (alias) const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>
// import loginUser
router.post('/register', createUsuario)
router.get('/listar', getusuarios)
router.delete('/delete/:id', deleteUsuario)
router.put('/update/:id', updateUsuario)
router.get('/getUser/:id', getUsuarioById)
router.post('/login', loginUser)
export default router
