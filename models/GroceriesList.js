const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceriesSchema = new Schema (
    {
        groceries: [String],
        timeline: {
            type: String,
            enum: ['1', '2', '3'],
            // 1 - Today, 2- By tomorrow, 3 - Some day this week
            default: '2',
            required: true
        },
        description: String,
        photo: String,
        helper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        requestor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['1', '2', '3'],
            // 1 - New, 2 - In progress, 3 - Completed
            default: '1',
        },
        completed: Boolean,
        address: String,
        lat: Number,
        lng: Number
    },
{timestamps: true});

const GroceriesList = mongoose.model('GroceriesList', GroceriesSchema);
module.exports = GroceriesList;