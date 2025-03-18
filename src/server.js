import express from 'express'
import cors from 'cors'
import userRoutes from '../src/routes/userRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

connectDB() // Conectar a la base de datos
