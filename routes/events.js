const express = require('express');
// const { Metagame } = require('./../schema/metagameSchema'); //. Customer
// const validateMetagame = require('../validation/validateMetagame');
// const metagame = require('../scrape-data/scrape.js');
const { Events } = require('../schema/eventsSchema');
const router = express.Router();

// get metagame data via ID
router.get('/', async (request, response) => {
    const events = await Events.find();
    if (!events) return response.status(404).send('The metagame data with the format ID was not found.');
    response.send(events);
});

// get metagame data via ID
router.get('/:id', async (request, response) => {
    const events = await Events.findById(request.params.id);
    if (!events) return response.status(404).send('The metagame data with the format ID was not found.');
    response.send(events);
});

module.exports = router;