const express = require('express');
const gameController = require('./src/controllers/gameController');
const routes = express.Router();

routes.post('/game', gameController.index);

module.exports = routes;