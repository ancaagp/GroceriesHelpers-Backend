const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

// GroceriesList
router.get('/groceries', verifyToken, ctrl.groceries.index);

module.exports = router;