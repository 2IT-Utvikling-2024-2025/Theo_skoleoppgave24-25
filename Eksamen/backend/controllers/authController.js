// backend/controllers/authController.js
const { pool } = require('../db');

async function login(req, res, next) {
  try {
    const { name, password } = req.body;
    // Hent bruker + tilhørende type og pris via JOIN
    const [rows] = await pool.query(
      `SELECT 
         m.id,
         m.name,
         mt.type        AS membership_type,
         mt.price       AS price
       FROM members m
       JOIN membership_types mt
         ON m.membership_type_id = mt.id
       WHERE m.name = ? AND m.password = ?`,
      [name, password]
    );

    if (rows.length === 0) {
      // 401 ved ugyldig brukernavn/passord
      return res.status(401).json({ error: 'Ugyldig navn eller passord' });
    }

    // Returnér bruker‐objektet
    res.json(rows[0]);
  } catch (err) {
    console.error('Login error:', err.sqlMessage || err.message);
    // 500 ved andre feil
    res.status(500).json({ error: err.sqlMessage || 'En intern feil oppstod.' });
  }
}

module.exports = { login };
