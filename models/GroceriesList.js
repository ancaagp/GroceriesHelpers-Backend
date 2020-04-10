const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceriesSchema = new Schema (
    {
        groceries: [String],
        timeline: [String],
        description: String,
        photo: String,
        helper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: [String],
        completed: Boolean,
    },
{timestamps: true});

const GroceriesList = mongoose.model('GroceriesList', GroceriesSchema);
module.exports = GroceriesList;