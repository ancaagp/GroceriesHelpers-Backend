const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroceriesList = require('./GroceriesList');

const validateEmail = function(email) {
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return re.test(email)
};

const UserSchema = new Schema (
    {
        firstName: { type: String, required: true, minlength:2, maxlength: 30 },
        lastName: { type: String, minlength:2, maxlength: 30 },
        phoneNumber: { type: String},
        intro: { type: String },
        address: { type: String, minlength:2, maxlength: 100 },
        lat: { type: Number},
        lng: { type: Number },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: { type: String, required: true, minlength: 8},
        groceriesList: [GroceriesList.schema],
    },
    {timestamps: true});


const User = mongoose.model('User', UserSchema);
 module.exports = User;