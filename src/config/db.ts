// 🔵 También podrías cargar variables de entorno manualmente con dotenv, pero ya se asume que las cargas en otro archivo (por ejemplo server.ts o config).

import { Sequelize } from 'sequelize'
// 🔵 Importamos Sequelize, el ORM (Object Relational Mapper) que usamos para interactuar con bases de datos relacionales como SQL Server.
import dotenv from 'dotenv'
// 🔵 Importamos dotenv para cargar variables de entorno desde un archivo .env (si existe).

dotenv.config()

// 🔵 Creamos una instancia de Sequelize para conectar a la base de datos usando los datos de .env
const sequelize = new Sequelize(
  process.env.DB_NAME!,    // 🔵 Nombre de la base de datos (variable de entorno obligatoria).
  process.env.DB_USER!,    // 🔵 Usuario para conectarse (obligatorio).
  process.env.DB_PASSWORD!,// 🔵 Contraseña del usuario (obligatorio).
  {
    dialect: 'mssql',       // 🔵 Especificamos que el motor de la base de datos es Microsoft SQL Server.
    host: process.env.DB_HOST!, // 🔵 Dirección (host) donde está el servidor SQL (en tu caso un socket de Cloud SQL o una IP privada).
    dialectOptions: {       // 🔵 Opciones específicas para mssql.
      options: {
        encrypt: true,      // 🔵 Cifra la conexión (obligatorio en nubes como Azure y CloudSQL).
        trustServerCertificate: true // 🔵 Permite confiar en certificados autofirmados (necesario en ambientes de prueba o Cloud SQL).
      }
    },
    logging: false,         // 🔵 Desactivamos los logs SQL en consola (solo salen si ocurre un error).
  }
)

// 🔵 Exportamos la instancia para poder usarla en cualquier parte del backend (por ejemplo, en modelos o controladores).
export default sequelize
