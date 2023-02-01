const mysql = require('mysql2');

const db = mysql.createPool({
    connectionLimit: 20,
    host: "localhost",
    user: "root",
    password: "elai",
    database: "cpet17finals"
})

module.exports = db;