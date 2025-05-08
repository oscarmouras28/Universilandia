import express from "express";
import { listarCarrerasUniversitarias } from "../controllers/carreraUni.controller.js";

const router = express.Router();

router.get("/listar", listarCarrerasUniversitarias);

export default router;
