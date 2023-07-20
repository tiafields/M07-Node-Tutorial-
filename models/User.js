//aquire mongoose 
const mongoose = require('mongoose');


//schemas for users 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required:true,
        minLength: 6
    },

})

//creating model based off the user schema 
const User = mongoose.model('user', userSchema);
module.exports = User; 