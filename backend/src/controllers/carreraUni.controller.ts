import type { Request, Response } from 'express';
import { carreraUni } from '../models/carreraUni.js';


// Obtener todas las carreras universitarias con su universidad
export const listarCarrerasUniversitarias = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraUni.findAll();
    res.status(200).json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras universitarias:', error);
    res.status(500).json({ error: 'Error interno al obtener carreras universitarias' });
  }
};

// Obtener una carrera universitaria por ID con su universidad
export const CarreraUniversitariaPorId = async (req: Request, res: Response): Promise<void> => {
 return new Promise (async (resolve, reject) => {
  try{
    const {idCarrUni} = req.params;
    if (!idCarrUni) {
      res.status(400).json({ error: 'El idCarrera es obligatorio' });
      return resolve();
    }
    const Carrera = await carreraUni.findByPk(idCarrUni);
    if (Carrera){
     res.status(200).json(Carrera);
    } else{
     res.status(404).json({ error: 'Carrera no encontrada' });
    }
    resolve();
  }catch (error) {
    console.error('Error al obtener carrera universitaria por ID:', error);
    res.status(500).json({ error: 'Error interno al obtener carrera universitaria por ID' });
    reject(error);
  }
  });
};