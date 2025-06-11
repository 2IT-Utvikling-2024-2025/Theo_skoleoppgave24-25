// backend/controllers/membersController.js
const { pool } = require('../db');

// Finn pris/ID basert på tekst
async function resolveMembershipType(type) {
  const [[mt]] = await pool.query(
    'SELECT id, price FROM membership_types WHERE type = ?',
    [type]
  );
  if (!mt) throw new Error('Ugyldig medlemskapstype');
  return mt;
}

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT m.id,
             m.name,
             mt.type   AS membership_type,
             mt.price  AS price
      FROM members m
      JOIN membership_types mt
        ON m.membership_type_id = mt.id
      ORDER BY m.id
    `);
    res.json(rows);
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT m.id,
             m.name,
             mt.type  AS membership_type,
             mt.price AS price
      FROM members m
      JOIN membership_types mt
        ON m.membership_type_id = mt.id
      WHERE m.id = ?
    `, [id]);
    if (!rows.length) return res.status(404).json({ error: 'Member not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { name, membership_type, password } = req.body;
    const mt = await resolveMembershipType(membership_type);

    const [result] = await pool.query(
      'INSERT INTO members (name, password, membership_type_id) VALUES (?,?,?)',
      [name, password, mt.id]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      membership_type: mt.type,
      price: mt.price
    });
  } catch (err) {
    if (err.message === 'Ugyldig medlemskapstype') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name, membership_type } = req.body;
    const mt = await resolveMembershipType(membership_type);

    const [result] = await pool.query(
      `UPDATE members
         SET name = ?, membership_type_id = ?
       WHERE id = ?`,
      [name, mt.id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({
      id: Number(id),
      name,
      membership_type: mt.type,
      price: mt.price
    });
  } catch (err) {
    if (err.message === 'Ugyldig medlemskapstype') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await pool.query('DELETE FROM members WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (err) { next(err); }
}

// Hent alle medlemskapstyper med pris
async function getTypes(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, type AS membership_type, price FROM membership_types'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getTypes   
};
