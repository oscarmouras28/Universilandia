import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import comentarioRoutes from './routes/comentarioRoutes.js'
import likeBlogRoutes from './routes/likeBlogRoutes.js'
import suscripcionRoutes from './routes/suscripcionRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import dotenv from 'dotenv'
import sequelize from './config/db.js'; // ✅ Importas la instancia de Sequelize
import fs from 'fs';
import { blog, comentario, initModels, likeBlog, suscripcion } from './models/init-models.js';



dotenv.config()



const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/users', userRoutes)
//se creo una ruta para blogs
app.use('/api/blogs', blogRoutes)
//se crea una ruta para comentario
app.use('/api/comentarios', comentarioRoutes)
//se crea una ruta para likes
app.use('/api/likes', likeBlogRoutes)
//se crea una ruta para suscripciones
app.use('/api/suscripciones', suscripcionRoutes)
//Se crea una ruta para estudiantes
app.use('/api/estudiantes', estudianteRoutes)


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
