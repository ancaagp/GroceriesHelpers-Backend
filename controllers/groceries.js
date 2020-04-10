const db = require('../models');

const index = (req, res) => {
    db.GroceriesList.find({}, (err, groceries) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong'});
        res.json(groceries);
    });
};

module.exports = {
    index,
};