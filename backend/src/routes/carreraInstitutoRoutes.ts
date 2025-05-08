import express from "express";
import { listarCarrerasInstituto } from "../controllers/carreraInst.controller.js";

const router = express.Router();

router.get("/listar", listarCarrerasInstituto);

export default router;
