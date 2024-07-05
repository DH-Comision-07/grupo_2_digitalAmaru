const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControler');

router.get('/cartAdd', cartController.viewCart);
router.post('/add', cartController.addToCart);

module.exports = router;
