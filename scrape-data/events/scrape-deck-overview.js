var request = require('request'),
    cheerio = require('cheerio'),
    scrapeDecklist = require('./scrape-decklist');

function getDeckOverview(eventId) {
    return new Promise(function (resolve, reject) {
        request('http://mtgtop8.com/event?e=' + eventId, function (err, res, html) {
            if (err) return reject(err);
            var $ = cheerio.load(html);
            var decks = [];
            $('table td[width="25%"] > div > div:not([align="center"])').each(async function (i, div) {
                var link = $($('div div a', div)[0]).attr('href');
                let deckId = parseInt(link.match(/\&d\=(\d*)/)[1]);
                let cards = await scrapeDecklist.getDecklist(eventId, deckId);
                decks.push({
                    result: $('div div[align=center]', div).text().trim(),
                    title: $($('div div a', div)[0]).text().trim(),
                    player: $($('div div a', div)[1]).text().trim(),
                    id: deckId,
                    cards: cards
                });
            });
            resolve(decks);
        });
    });
}

module.exports.getDeckOverview = getDeckOverview;