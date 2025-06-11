const express = require('express');
const router  = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [types] = await require('../db').pool.query(
      'SELECT id, type AS membership_type, price FROM membership_types'
    );
    res.json(types);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
