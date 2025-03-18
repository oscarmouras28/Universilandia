import bcrypt from 'bcryptjs'
import { createUser } from '../models/userModels.js'

export async function register (req, res) {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await createUser(name, email, hashedPassword)
    res.status(201).json({ message: 'Usuario registrado' })
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' })
  }
}
