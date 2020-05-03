const repository = require('../data/repository');
const express = require('express');

let PageController = express.Router();

PageController.get('/', function(req, res) {
    console.log(req.query);
    res.send('Hello World!');
});

export {PageController}