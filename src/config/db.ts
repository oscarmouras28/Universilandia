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