const mongoose = require('mongoose');

const decksSchema = new mongoose.Schema({
    result: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    player: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    id: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    card: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
});
const Decks = mongoose.model('Decks', decksSchema);

module.exports.decksSchema = decksSchema;
module.exports.Decks = Decks;