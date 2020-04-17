const db = require('../models');


const index = async (req, res) => {
  try {
    const user = await db.User.find({});
    if (!user) return res.status(404).json({error: 'No users found!'});
    return res.json(user);
  } catch (err) {
    return res.status(500).json('uh oh');
  }
}
    
const show = async (req, res) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) return res.status(404).json({error: 'No user found with that ID!'});
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const update = async (req, res) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({error: 'User couldn\'t be updated!'});
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({status: 400, error: 'User update went wrong, please try again'});
  }
}

const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
      res.json(deletedUser);
    });
  };

module.exports = {
  index,
  show,
  update,
  destroy
}