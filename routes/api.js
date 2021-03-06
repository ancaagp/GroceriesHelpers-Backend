const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

// GroceriesList
router.get('/groceries', ctrl.groceries.index);
router.get('/groceries/mygroceries', verifyToken, ctrl.groceries.myGroceries);
router.post('/groceries', verifyToken, ctrl.groceries.create);
// router.put('/groceries/:id', ctrl.groceries.update);
router.delete('/groceries/:id', verifyToken, ctrl.groceries.destroy);
router.put('/groceries/:id/help', verifyToken, ctrl.groceries.help);
router.put('/groceries/:id/complete', verifyToken, ctrl.groceries.complete);

// User
router.get('/users', verifyToken, ctrl.users.index)
router.get('/users/:id', verifyToken, ctrl.users.show);
router.put('/users', verifyToken, ctrl.users.update);
// router.delete('/users/:id', ctrl.users.destroy);



module.exports = router;