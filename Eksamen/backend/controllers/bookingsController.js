// backend/controllers/bookingsController.js
const { pool } = require('../db');

async function getByMember(req, res, next) {
  try {
    const memberId = req.params.member_id;
    const [rows] = await pool.query(
      'SELECT * FROM bookings WHERE member_id = ? ORDER BY booked_at DESC',
      [memberId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createBooking(req, res, next) {
  try {
    const { member_id, class_type } = req.body;
    const [result] = await pool.query(
      'INSERT INTO bookings (member_id, class_type) VALUES (?, ?)',
      [member_id, class_type]
    );
    res.status(201).json({ id: result.insertId, member_id, class_type });
  } catch (err) {
    next(err);
  }
}

module.exports = { getByMember, createBooking };
