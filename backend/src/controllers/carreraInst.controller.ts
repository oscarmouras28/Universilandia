import type { Request, Response } from 'express';
import { carreraInstituto } from '../models/carreraInstituto.js';
import { instituto } from '../models/instituto.js';

// Obtener todas las carreras de instituto con su instituto asociado
export const listarCarrerasInstituto = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraInstituto.findAll({
      include: [{
        model: instituto,
        attributes: ['nombreInstituto', 'region', 'direccion'],
      }]
    });
    res.status(200).json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras de instituto:', error);
    res.status(500).json({ error: 'Error interno al obtener carreras de instituto' });
  }
};
