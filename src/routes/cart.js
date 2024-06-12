const express = require('express');
const router = express.Router();
const cartControler = require('../controllers/cartControler');

router.get("/product:id", cartControler.cartCompleteById);

module.exports = router;