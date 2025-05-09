import express from "express";
import { listarCarrerasUniversitarias } from "../controllers/carreraUni.controller.js";
import { verificarToken } from "../middleware/authMiddleware.js";
import { CarreraUniversitariaPorId } from "../controllers/carreraUni.controller.js";

const router = express.Router();

router.get("/listar",verificarToken, listarCarrerasUniversitarias);
router.get("/listar/:idCarrUni",verificarToken, CarreraUniversitariaPorId);
export default router;
