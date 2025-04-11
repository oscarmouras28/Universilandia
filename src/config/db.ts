// import sql from 'mssql'
// import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: 'mssql',
    host: process.env.DB_HOST! ,
    dialectOptions: {
      options: {
        encrypt: true, // para Azure y Cloud SQL
        trustServerCertificate: true
      }
    },
    logging: false,
  }
)

export default sequelize

// dotenv.config({ path: './.env' })

// const config = {
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASSWORD!,
//   server: process.env.DB_SERVER!,
//   database: process.env.DB_NAME!,
//   options: {
//     encrypt: true,
//     trustServerCertificate: true
//   }
// }

// export async function connectDB () {
//   try {
//     await sql.connect(config)
//     console.log('Conexión exitosa a SQL Server')
//   } catch (error) {
//     console.error('Error en la conexión a SQL Server:', error)
//   }
// }

// connectDB()

// export default sql
