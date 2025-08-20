import { getSignedUrl } from '../utils/storage.js';
import type { Request, Response } from 'express';
import { multimedia } from '../models/multimedia.js';

export const obtenerMultimedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    console.warn('[obtenerMultimedia] Acceso no autorizado');
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  try {
    const media = await multimedia.findByPk(id);
    console.log('[obtenerMultimedia] Resultado de búsqueda:', media ? 'Encontrado' : 'No encontrado');

    if (!media) {
      console.warn('[obtenerMultimedia] Archivo multimedia no encontrado para ID:', id);
      res.status(404).json({ error: 'Archivo multimedia no encontrado' });
      return;
    }

    const fileName = media.url;
    console.log('[obtenerMultimedia] Nombre del archivo en BD:', fileName);

    if (!fileName) {
      console.error('[obtenerMultimedia] La multimedia no tiene archivo asignado');
      res.status(500).json({ error: 'La multimedia no tiene archivo asignado' });
      return;
    }

    // Verifica si el archivo tiene espacios o caracteres extraños
    console.log('[obtenerMultimedia] Nombre del archivo (sin encode):', fileName);
    console.log('[obtenerMultimedia] Nombre del archivo (con encodeURIComponent):', encodeURIComponent(fileName));

    const urlFirmada = await getSignedUrl(fileName);
    console.log('[obtenerMultimedia] URL firmada generada:', urlFirmada);

    res.json({
      ...media.toJSON(),
      urlVideo: urlFirmada,
    });

  } catch (error) {
    console.error('[obtenerMultimedia] Error inesperado:', error);
    res.status(500).json({ error: 'Error interno al obtener la multimedia' });
  }
};