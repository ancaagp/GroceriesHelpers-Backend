const db = require('../models');

const index = (req, res) => {
    // getting all the groceries that are not in status completed
    db.GroceriesList.find({status : {$ne: 'C'} }, (err, groceries) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong'});
        res.json(groceries);
    });
};


const create = async (req, res) => {
    // adds user id from the token as requestor id
    req.body.requestor = req.user._id;
    db.GroceriesList.create(req.body, (err, newGrocery) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 1' });
        }
        db.User.findById(req.user._id, (err, foundUser) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 2' });
            foundUser.groceriesList.push(newGrocery);
            foundUser.save((err, savedUser) => {
                if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 3' });
                res.json(newGrocery);
            });
        });
    });
};

const help = async (req, res) => {
    db.GroceriesList.findById(req.params.id, (err, grocery) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.'});
        }
        grocery.helper = req.user._id;
        grocery.status = 'P';
        grocery.save((err, savedGrocery) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.'});
            }
            db.User.findById(savedGrocery.requestor, (err, requestorUser) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 2' });
                }

                let groceryIndex = requestorUser.groceriesList.findIndex(gro => gro._id === savedGrocery._id);
                requestorUser.groceriesList[groceryIndex] = savedGrocery;
                requestorUser.save((err, savedRequestor) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 3' });
                    }
                    res.json(savedGrocery);
                });
            });
        });
    });
};


module.exports = {
    index,
    create,
    help
};