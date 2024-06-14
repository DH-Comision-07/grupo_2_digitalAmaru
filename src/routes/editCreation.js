const express = require('express');
const router = express.Router();
const editCreationControler = require('../controllers/editCreationControler');
console.log(editCreationControler);

router.get("/edit", editCreationControler.creationproduct);

module.exports = router;