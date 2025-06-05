import type { Request, Response } from 'express';
import { getSignedUrl } from '../utils/storage.js';
import { carreraUni, universidad, multimedia } from '../models/init-models.js';

// Obtener todas las carreras universitarias
export const listarCarrerasUniversitarias = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraUni.findAll();
    res.status(200).json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras universitarias:', error);
    res.status(500).json({ error: 'Error interno al obtener carreras universitarias' });
  }
};

// Obtener una carrera universitaria por ID con su universidad y URL firmada del video
export const CarreraUniversitariaPorId = async (req: Request, res: Response): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { idCarrUni } = req.params;
      if (!idCarrUni) {
        res.status(400).json({ error: 'El idCarrera es obligatorio' });
        return resolve();
      }

      const Carrera = await carreraUni.findByPk(idCarrUni, {
        include: [
          {
            model: universidad,
            as: 'idUniversidad_universidad',
            attributes: ['nombreUniversidad']
          },
          {
            model: multimedia,
            as: 'multimedia',
            attributes: ['idMultimedia', 'url', 'descripcion']
          }
        ]
      });

      if (!Carrera) {
        res.status(404).json({ error: 'Carrera no encontrada' });
        return resolve();
      }

      // Generar URL firmada evitando duplicación de ruta
      let urlVideo = null;
      const fileName = Carrera.multimedia?.url;

      if (fileName) {
        // Normaliza la ruta del objeto para evitar errores como "vodcasts/vodcasts/..."
        const cleanPath = fileName.startsWith('vodcasts/')
          ? fileName
          : `vodcasts/${fileName}`;

        try {
          urlVideo = await getSignedUrl(cleanPath);
        } catch (err) {
          console.warn('No se pudo generar URL firmada:', err);
        }
      }

      // Devolver la carrera con URL firmada del video
      res.status(200).json({
        ...Carrera.toJSON(),
        urlVideo
      });

      resolve();
    } catch (error) {
      console.error('Error al obtener carrera universitaria por ID:', error);
      res.status(500).json({ error: 'Error interno al obtener carrera universitaria por ID' });
      reject(error);
    }
  });
};
