const { Pool } = require("pg");

const DB_POOL = new Pool({
  host: "localhost",
  user: "admin",
  password: "1234",
  port: 5433,
  database: "brushwire",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 1000,
});

/**
 * Check if a query return only one row
 * @param {Pool} pool pool object
 * @param {*} query query to execute
 * @param {*} parameters parameters for query
 * @returns True if exist only one row
 */
async function existOnlyOne(pool, query, parameters) {
  const DBData = await pool.query(query, parameters);
  return DBData.rowCount === 1;
}

module.exports = { DB_POOL, existOnlyOne };
