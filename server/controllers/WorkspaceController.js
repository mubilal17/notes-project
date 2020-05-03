import {Repository} from '../data/repository'
const express = require('express');

let WorkspaceController = express.Router();
let repository = new Repository();
console.log(repository);
WorkspaceController.get('/', function(req, res) {
    console.log(repository);
    let sections = repository.getSections();
    res.send(sections);
});

export {WorkspaceController}