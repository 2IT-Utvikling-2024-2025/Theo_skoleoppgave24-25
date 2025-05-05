// data/db.js
const mysql = require('mysql2');

// Opprett en connection til databasen
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'skole123',           // <-- Bytt til ditt MySQL-passord
  database: 'vhd_produkter' // <-- Bytt til databasenavnet ditt
});

// Koble til
db.connect((err) => {
  if (err) {
    console.error('Feil ved MySQL-tilkobling:', err);
    return;
  }
  console.log('Tilkoblet MySQL!');
});

module.exports = db;
