import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import sequelize from './config/db.js'; // ✅ Importas la instancia de Sequelize
import fs from 'fs';
import { initModels } from './models/init-models.js';



dotenv.config()



const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('¡Universilandia Backend funcionando!')
})

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

  try {
    await sequelize.authenticate(); // ✅ Verifica conexión con Sequelize
    console.log('✅ Conexión establecida con Cloud SQL mediante Sequelize.');
    initModels(sequelize) // ✅ Inicializas los modelos
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
});
