const express = require("express");

const { getAllData, getSingleData, createData, updateData, deleteData} = require('../Controllers/controller');
const router = express.Router();

router.get('/', getAllData);
router.get('/:id', getSingleData);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;
