const express = require('express');

const { admin } = require('../controllers/dashController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', authenticateToken, authorizeRoles('admin'), admin);

module.exports = router;
