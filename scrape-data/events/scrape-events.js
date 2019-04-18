var request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    scrapeDeckOverview = require('./scrape-deck-overview'),
    scrapeAmountOfPlayers = require('./scrape-amount-of-players');

function getEventsData(formatRequest, index) {
    return new Promise(function (resolve) {
        var mtgTop8URL = 'http://mtgtop8.com/format?f=' + formatRequest;
        request.post(mtgTop8URL, { form: { cp: index } }, function (error, response, html) {
            if (error) return reject(error);
            var result = [];
            let $ = cheerio.load(html);
            var table = $('div div table tr td[width="40%"] > table');
            $('tr[height="30"]', table[1]).each(async function (i, div) {
                var link = $('td a', div).attr('href');
                var date = $('td[align="right"]', div).text();
                let eventId = parseInt(link.match(/e\=(\d*)/)[1]);
                let decks = await scrapeDeckOverview.getDeckOverview(eventId);
                let players = await scrapeAmountOfPlayers.getAmountOfPlayers(eventId);
                result.push({
                    title: ($('td a', div).text()).toString(),
                    id: eventId,
                    date: (moment(date, "DD.MM.YYYY").toDate()).toString(),
                    format: formatRequest,
                    decks: decks,
                    players: players
                });
                resolve(result);
            });
        });
    });
}

module.exports.getEventsData = getEventsData;