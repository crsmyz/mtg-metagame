var request = require('request'),
    cheerio = require('cheerio');

function getAmountOfPlayers(eventId) {
    return new Promise(function (resolve, reject) {
        request('http://mtgtop8.com/event?e=' + eventId, function (err, res, html) {
            if (err) return reject(err);
            var $ = cheerio.load(html);
            var players;
            var data = $('table div table td[align=center] div')[1].prev.data.trim();
            var playersRE = /^(\d*) players/;
            if (data.match(playersRE)) players = parseInt(data.match(playersRE)[1]);
            resolve(players);
        });
    });
}

module.exports.getAmountOfPlayers = getAmountOfPlayers;