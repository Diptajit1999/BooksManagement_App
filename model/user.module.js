const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Define roles
        default: 'user' // Default role
    }
},{
    versionKey:false,
    timestamps:true
});

const UserModel = mongoose.model('user', userSchema);

module.exports = {UserModel};