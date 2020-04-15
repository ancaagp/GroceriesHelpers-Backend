const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

// GroceriesList
router.get('/groceries', ctrl.groceries.index);
// router.get('/groceries/:id', ctrl.groceries.show);
router.post('/groceries',verifyToken, ctrl.groceries.create);
// router.put('/groceries/:id', ctrl.groceries.update);
// router.delete('/groceries/:id', ctrl.groceries.destroy);
router.put('/groceries/:id/help', verifyToken, ctrl.groceries.help);

// User
router.get('/users', ctrl.users.index)
router.get('/users/:id', ctrl.users.show);
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);



module.exports = router;