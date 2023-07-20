//aquire mongoose 
const mongoose = require('mongoose');
const { isEmail } = require('validator');


//schemas for users 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter an valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }

});

//creating model based off the user schema 
const User = mongoose.model('user', userSchema);
module.exports = User; 