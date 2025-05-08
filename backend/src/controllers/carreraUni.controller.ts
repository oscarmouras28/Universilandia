import type { Request, Response } from 'express';
import { carreraUni } from '../models/carreraUni.js';
import { universidad } from '../models/universidad.js';

// Obtener todas las carreras universitarias con su universidad
export const listarCarrerasUniversitarias = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraUni.findAll({
      include: [{
        model: universidad,
        attributes: ['nombreUniversidad', 'region', 'direccion'],
      }]
    });
    res.status(200).json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras universitarias:', error);
    res.status(500).json({ error: 'Error interno al obtener carreras universitarias' });
  }
};
