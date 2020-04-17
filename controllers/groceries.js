const db = require('../models');

const index = (req, res) => {
    // getting all the groceries that are not in status completed
    db.GroceriesList.find({ status: { $ne: '3' } })
        .sort({ status: 'asc', createdAt: 'desc'})
        .exec(function (err, groceries) {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong' });
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
                if (err) 
                {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: 'Something went wrong, please try again on step 3' });
                }
                res.json(newGrocery);
            });
        });
    });
};


const help = async (req, res) => {
    db.GroceriesList.findById(req.params.id, (err, grocery) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
        }
        grocery.helper = req.user._id;
        grocery.status = '2';
        grocery.save((err, savedGrocery) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
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


const complete = async (req, res) => {
    let userId = req.user._id;
    db.GroceriesList.findById(req.params.id, (err, grocery) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
        }
        if (grocery.requestor && grocery.requestor.toString() !== userId) {
            return res.status(400).json({ status: 400, error: 'You are not allowed to perform this action.' });
        }
        grocery.status = '3';
        grocery.save((err, savedGrocery) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
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


const myGroceries = async (req, res) => {
    let userId = req.user._id;
    db.GroceriesList.find({ requestor: userId })
        .sort({ status: 'asc', createdAt: 'desc' })
        .exec(function (err, myGroceries) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
            }
            db.GroceriesList.find({ helper: userId }, (err, myGroceriesHelper) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });
                }

                res.json({ myGroceries, myGroceriesHelper });
            });
        });
};

const destroy = async (req, res) => {
    if (!req.user._id) return res.status(401).json({ error: 'You are not authorized to do that. Please login first.' });
    try {
        console.log(req.params)
        db.GroceriesList.findOneAndDelete({ _id: req.params.id, requestor: req.user._id }, (err, deletedGrocery) => {
            if (err) return res.status(404).json({ error: 'Grocery with that ID couldn\'t be found!, or you do not have the rights to do that.' });


            db.User.findById(req.user._id, (err, foundUser) => {
                if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again' });

                let matchingGroceryIndex = foundUser.groceriesList.findIndex(grocery => grocery._id.toString() === req.params.id );

                if (matchingGroceryIndex > -1) {
                    foundUser.groceriesList[matchingGroceryIndex].remove();
                }
                foundUser.save((err, savedUser) => {

                    if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again' });
                    return res.json(deletedGrocery);

                });
            });
        });
    } catch (err) {
        return res.status(500).json(err);
    }

}

module.exports = {
    index,
    create,
    help,
    myGroceries,
    complete,
    destroy
};