const db = require('../models');

const index = (req, res) => {
    db.GroceriesList.find({}, (err, groceries) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong'});
        res.json(groceries);
    });
};


const create = async (req, res) => {
    // adds user id from the token as requestor id
    req.body.requestor = req.user._id;
    db.GroceriesList.create(req.body, (err, newGrocery) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again' });
        db.User.findById(req.user._id, (err, foundUser) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again' });
            foundUser.groceriesList.push(newGrocery);
            foundUser.save((err, savedUser) => {
                if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again' });
                res.json(newGrocery);
            });
        });
    });
};


module.exports = {
    index,
    create,
};