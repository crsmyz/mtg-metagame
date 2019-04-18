const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    cards: {
        type: Array
    },
    sideboard: {
        type: Array
    }
});
const Cards = mongoose.model('Cards', cardsSchema);

module.exports.cardsSchema = cardsSchema;
module.exports.Cards = Cards;