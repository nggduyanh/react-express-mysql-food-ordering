const mySQL = require ("mysql2")
const dbConfig = require ("../configs/DbConfig")
const pool = mySQL.createPool (dbConfig).promise ()


module.exports = pool