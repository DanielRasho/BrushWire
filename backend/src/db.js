const { Pool } = require('pg')
const Logger = require('./Logger')

const DB_POOL = new Pool({
  host: process.env.DB_HOST,
  user: 'admin',
  password: '1234',
  port: process.env.DB_PORT,
  database: 'brushwire',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 1000
})

// Checking connection
DB_POOL.query('SELECT NOW()', (err, res) => {
  if (err) {
    Logger.error('Error connecting to the database', err)
  } else {
    Logger.info('Connected to the database')
  }
})

/**
 * Check if a query return only one row
 * @param {Pool} pool pool object
 * @param {*} query query to execute
 * @param {*} parameters parameters for query
 * @returns True if exist only one row
 */
async function existOnlyOne(pool, query, parameters) {
  const DBData = await pool.query(query, parameters)
  return DBData.rowCount === 1
}

module.exports = { DB_POOL, existOnlyOne }
