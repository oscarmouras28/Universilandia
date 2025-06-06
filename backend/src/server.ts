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
import {initModels} from './models/init-models.js';
import pagoRoutes from './routes/pagoRoutes.js'; // importacion de las rutas de pago
import transaccionRoutes from './routes/transaccionRoutes.js';
import carreraInstitutoRoutes from './routes/carreraInstitutoRoutes.js';
import carreraUniversidadRoutes from './routes/carreraUniversidadRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Importa las rutas de admin
import multimediaRoutes from './routes/multimediaRoutes.js';
import { webhookNotificacion } from './controllers/pago.controller.js';






dotenv.config()



const app = express()
app.use(cors())
app.post('/api/pagos/webhook', express.raw({ type: 'application/json' }), webhookNotificacion);

app.use(express.json())


//se crea una ruta para usuarios
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
//se crea una ruta para pagos
app.use('/api/pagos', pagoRoutes);
//se crea una ruta para transacciones
app.use('/api/transacciones', transaccionRoutes);
//se crea una ruta para carreras de instituto
app.use('/api/carrerasInstituto', carreraInstitutoRoutes)
//se crea una ruta para carreras universitarias
app.use('/api/carrerasUniversitarias', carreraUniversidadRoutes)
//se crea una ruta para admin
app.use('/api/admin', adminRoutes); 
// Usa las rutas de admin
app.use('/api/multimedia', multimediaRoutes);
// usa las rutas multimedia


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
