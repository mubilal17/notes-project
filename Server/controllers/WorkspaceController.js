import {Repository} from '../data/repository'
const express = require('express');

let WorkspaceController = express.Router();
let repository = new Repository();

WorkspaceController.get('/', function(req, res) {
    let sections = repository.getSections();
    res.send(sections);
});

export {WorkspaceController}