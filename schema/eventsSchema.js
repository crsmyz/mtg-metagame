const mongoose = require('mongoose');
const { decksSchema } = require('../schema/decksSchema');

const Events = mongoose.model('Events', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    id: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    date: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    format: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    decks: {
        type: Array,
        required: true
    },
    players: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 50
    }
}, { collection: 'events'}));

module.exports.Events = Events;