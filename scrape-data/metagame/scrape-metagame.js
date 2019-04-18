var request = require('request'),
    cheerio = require('cheerio');

function getMetagame(formatRequest) {
    return new Promise(function (resolve, reject) {
        var mtgTop8URL = 'https://www.mtgtop8.com/format?f=' + formatRequest;
        request.post(mtgTop8URL, (error, response, html) => {
            if (error) return reject(error);
            let $ = cheerio.load(html);
            let table = $('.hover_tr').text();
            let links = $('a');
            let ar = [];
            links.each(function () {
                let a = $(this).attr('href');
                if (a.includes('archetype')) {
                    ar.push(a);
                }
            });
            let metaGameDecks = $('.S14').text().toString();
            table = table.replace(/\s/g, '');
            table = table.slice(0, table.lastIndexOf('Other-Combo') + 14);
            table = table.replace(/[0-9][%]/g, ' ');
            resolve(assignDeckDataToDeckObjectList(
                table.match(/[a-z]+[&]?[']?[-]?[(]?[a-z]?[)]?[a-z]+[0-9]{0,4}/gi),
                {
                    aggro: metaGameDecks.match(/Aggro[0-9][0-9]/g).toString(),
                    control: metaGameDecks.match(/Control[0-9][0-9]/g).toString(),
                    combo: metaGameDecks.match(/Combo[0-9][0-9]/g).toString()
                }
            ));
        });
    });
}

function assignDeckDataToDeckObjectList(deckNameList, metagameOverview) {
    let decks = [];
    let deckSum = 0;
    deckNameList.map(val => {
        deckSum += +val.match(/[0-9]{1,2}/g);
        decks.push(
            archetypeObject = {
                name: val.match(/[a-z]+[&]?[']?[-]?[(]?[a-z]?[)]?[a-z]+/gi).toString(), // [0-9]?
                numberOfDeck: +val.match(/[0-9]{1,2}/g),
                percentageOfMetagame: 0,
                archetype: ''
            }
        )
    });
    decks.map(val => {
        val.percentageOfMetagame = val.numberOfDeck / deckSum;
    });
    let endAggro = decks.findIndex(val => val.name === 'Other-Aggro');
    let endControl = decks.findIndex(val => val.name === 'Other-Control');
    let endCombo = decks.findIndex(val => val.name === 'Other-Combo');
    decks.map((val, index) => {
        if (index <= endAggro) {
            val.archetype = 'Aggro';
        } else if (index > endAggro && index <= endControl) {
            val.archetype = 'Control';
        } else if (index > endControl && index <= endCombo) {
            val.archetype = 'Combo';
        }
    });
    metagameOverview.aggro = +metagameOverview.aggro.replace(/Aggro/g, '');
    metagameOverview.control = +metagameOverview.control.replace(/Control/g, '');
    metagameOverview.combo = +metagameOverview.combo.replace(/Combo/g, '');
    return {
        numberOfTotalDecks: deckSum,
        metagameOverview: metagameOverview,
        timestamp: new Date(),
        deckDataArray: decks
    };
}

module.exports.getMetagame = getMetagame;