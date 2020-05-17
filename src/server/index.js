const mongoDb = require('./mongo.js');
const express = require('express');
var bodyParser = require('body-parser');

const config = require('../../config');

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());

// API
// getAllEncounters
app.get('/api/getAllEncounters', mongoDb.getAllEncounters, function(req,res){});

// getEncounter
app.get('/api/getEncounter/:id', mongoDb.getEncounter, function(req,res){});

// createEncounter
app.post('/api/createEncounter', mongoDb.createEncounter, function(req,res){});

// Server listen
app.listen(process.env.PORT || config.server.port, () => console.log(`Listening on port ${process.env.PORT || config.server.por}!`));
//aap.listen(8080, '192.168.1.4');
