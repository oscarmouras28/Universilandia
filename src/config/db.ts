import sql from 'mssql'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

export async function connectDB () {
  try {
    await sql.connect(config)
    console.log('Conexión exitosa a SQL Server')
  } catch (error) {
    console.error('Error en la conexión a SQL Server:', error)
  }
}

connectDB()

export default sql
