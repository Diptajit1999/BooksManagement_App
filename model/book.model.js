const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: Boolean,
        default: true // Initially set to available
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const BookModel = mongoose.model('book', bookSchema);

module.exports = {BookModel};
