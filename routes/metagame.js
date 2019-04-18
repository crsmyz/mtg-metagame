const express = require('express');
// const { Metagame } = require('./../schema/metagameSchema'); //. Customer
// const validateMetagame = require('../validation/validateMetagame');
// const metagame = require('../scrape-data/scrape.js');
const { Metagame } = require('../schema/metagameSchema');
const router = express.Router();

// get metagame data via ID
router.get('/', async (request, response) => {
    const overview = await Metagame.find();
    console.log(overview);
    if (!overview) return response.status(404).send('The metagame overview was not found.');
    response.send(overview);
});

module.exports = router;