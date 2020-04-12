const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

// GroceriesList
router.get('/groceries', verifyToken, ctrl.groceries.index);

// User
router.get('/users', ctrl.users.index)
router.get('/users/:id', ctrl.users.show);
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);



module.exports = router;