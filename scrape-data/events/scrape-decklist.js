var request = require('request'),
    cheerio = require('cheerio');

function getDecklist(eventId, deckId) {
    return new Promise(function (resolve, reject) {
        request('http://mtgtop8.com/event?e=' + eventId + '&d=' + deckId, function (err, res, html) {
            if (err) return reject(err);
            var $ = cheerio.load(html);
            var result = {
                cards: [],
                sideboard: []
            };
            var addCards = function (arr) {
                return function (i, card) {
                    var parent = $(card).parent();
                    $(card).remove();
                    var name = $(card).text().trim();
                    var count = parseInt($(parent).text().trim());
                    arr.push({
                        count: count,
                        name: name
                    });
                };
            };
            var tables = $('table table table');
            $('tr td div span', tables.last()).each(addCards(result.sideboard));
            tables.slice(0, -1).each(function (i, table) {
                $('tr td div span', table).each(addCards(result.cards));
            });
            // An check to make sure that it's being noticed if a deck is empty. Not too sure that the method above is always working for older data.
            if (!result.cards.length) console.log('[mtgtop8] It appears that this deck is empty, should be investigated. .event(' + eventId + ',' + deckId + ')');
            resolve(result);
        });
    });
}

module.exports.getDecklist = getDecklist;