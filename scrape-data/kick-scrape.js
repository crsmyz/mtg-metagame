var scrapeEvents = require('./events/scrape-events'),
    scrapeMetagame = require('./metagame/scrape-metagame');
const { Events } = require('../schema/eventsSchema');
const { Metagame } = require('../schema/metagameSchema');

let mtgEventData = [];
let metagameOverview;
async function kickAndSaveEventsData(format) {
    let result = await scrapeMetagame.getMetagame(format);
    // update DB
    const metagame = new Metagame({
        numberOfTotalDecks: result.numberOfTotalDecks,
        metagameOverview: result.metagameOverview,
        timestamp: result.timestamp,
        deckDataArray: result.deckDataArray
    });
    await metagame.save();
    console.log('done');
    // for (let i = 1; i < 41; i++) {
    //     await scrapeEvents.getEventsData(format, i).then(val => {
    //         if (val) {


    //             mtgEventData = mtgEventData.concat(val);
    //             console.log('await: ' + i);
    //         } else {
    //             return;
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
    // console.log('After loop');
    // // update DB
    // const event = new Events({
    //     title: mtgEventData.title,
    //     id: mtgEventData.id,
    //     date: mtgEventData.date,
    //     format: mtgEventData.format,
    //     decks: mtgEventData.decks,
    //     players: mtgEventData.players
    // });
    // await event.save();
    // console.log('After save');
};

// router.get('/', async (request, response) => {
//     const overview = await Metagame.find();
//     console.log(overview);
//     if (!overview) return response.status(404).send('The metagame overview was not found.');
//     response.send(overview);
// });

module.exports.kickAndSaveEventsData = kickAndSaveEventsData;