import { getSignedUrl } from '../utils/storage.js';
import type { Request, Response } from 'express';
import { multimedia } from '../models/multimedia.js';

export const obtenerMultimedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  const media = await multimedia.findByPk(id);

  if (!media) {
    res.status(404).json({ error: 'Archivo multimedia no encontrado' });
    return;
  }

  const fileName = media.url;

  if (!fileName) {
    res.status(500).json({ error: 'La multimedia no tiene archivo asignado' });
    return;
  }

  const urlFirmada = await getSignedUrl(fileName);

  res.json({
    ...media.toJSON(),
    urlVideo: urlFirmada,
  });
};