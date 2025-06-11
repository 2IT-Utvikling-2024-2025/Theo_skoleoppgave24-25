// routes/members.js
const express = require('express');
const { getAll, create, update, remove, getOne, getTypes } = require('../controllers/membersController');
const router = express.Router();

router.get('/', getAll);
router.get('/types', getTypes);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);        
router.delete('/:id', remove);

module.exports = router;
