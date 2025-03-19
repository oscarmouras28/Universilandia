import sql from '../config/db.js'

async function createUser (name, email, password) {
  try {
    const pool = await sql.connect()
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query('INSERT INTO users (name, email, password) VALUES (@name, @email, @password)')
  } catch (error) {
    console.error('Error al crear usuario:', error)
  }
}

export default createUser
