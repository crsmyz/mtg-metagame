const mongoose = require('mongoose');

const Metagame = mongoose.model('Metagame', new mongoose.Schema({
    numberOfTotalDecks: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    metagameOverview: {
        type: Object,
        required: true
    },
    timestamp: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    deckDataArray: {
        type: Array,
        required: true,
        minlength: 1
    }
}, { collection: 'metagame'}));

module.exports.Metagame = Metagame;