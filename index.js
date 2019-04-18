const mongoose = require('mongoose');
// const config = require('config');
const express = require('express');
const kickScrape = require('./scrape-data/kick-scrape');
const metagame = require('./routes/metagame');
const events = require('./routes/events');
const app = express();

// connect to Mongo DB
mongoose.connect('mongodb://localhost/mtg-metagame-db')
    .then(() => console.log('Connected to MongoDb...'))
    .catch((error) => console.error('Could not connect to Mongo DB... ', error));

kickScrape.kickAndSaveEventsData('LE');

// middleware usage
app.use(express.json());
// routes
// app.use('/api/le-metagame', legacyMetagame);
app.use('/api/metagame', metagame);
app.use('/api/events', events);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, (console.log(`Port: ${port}`)));