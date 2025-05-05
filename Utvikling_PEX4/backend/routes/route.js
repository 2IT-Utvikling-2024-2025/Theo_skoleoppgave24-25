// routes/route.js
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

// Produkter
router.get('/products', Controller.getAllProducts);
router.get('/products/:id', Controller.getOneProduct);

// Ordre
router.post('/orders', Controller.createOrder);
router.get('/orders', Controller.getAllOrders);

module.exports = router;
