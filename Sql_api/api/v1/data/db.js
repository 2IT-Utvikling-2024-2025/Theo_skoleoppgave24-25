const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'skole123',
    database: 'ruterdb2',
    waitForConnections: true,
    connectionLimit: 10,  // Adjust as needed
    queueLimit: 0
});

module.exports = { pool };