// backend/routes/bookings.js
const express = require('express');
const { getByMember, createBooking } = require('../controllers/bookingsController');
const router = express.Router();

// Hent alle bookinger for ett medlem
router.get('/:member_id', getByMember);

// Opprett ny booking
router.post('/', createBooking);

module.exports = router;
