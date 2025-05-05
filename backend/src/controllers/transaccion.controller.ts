import type { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.js';

// Crear nueva transacción
export const createTransaccion = async (req: Request, res: Response) => {
  try {
    const nuevaTransaccion = await transaccion.create(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la transacción', detalle: error.message });
  }
};

// Listar todas las transacciones
export const getTransacciones = async (_req: Request, res: Response) => {
  try {
    const transacciones = await transaccion.findAll();
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
};

// Obtener una transacción por ID
export const getTransaccionById = async (req: Request, res: Response) => {
  try {
    const transaccionEncontrada = await transaccion.findByPk(req.params.id);
    if (transaccionEncontrada) {
      res.status(200).json(transaccionEncontrada);
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacción' });
  }
};

// Actualizar transacción
export const updateTransaccion = async (req: Request, res: Response) => {
  try {
    const transaccionEncontrada = await transaccion.findByPk(req.params.id);
    if (transaccionEncontrada) {
      await transaccionEncontrada.update(req.body);
      res.status(200).json(transaccionEncontrada);
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar transacción' });
  }
};

// Eliminar transacción
export const deleteTransaccion = async (req: Request, res: Response) => {
  try {
    const transaccionEncontrada = await transaccion.findByPk(req.params.id);
    if (transaccionEncontrada) {
      await transaccionEncontrada.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar transacción' });
  }
};