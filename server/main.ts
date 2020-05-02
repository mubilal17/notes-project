const setupBundleScripts = require('./setupBundleScripts');
const express = require('express');
const app = express();
import {Repository} from './data/repository'

app.use(express.static('client/public'));
app.use(express.static('build/public'))
setupBundleScripts();


app.get('/document', function(req, res){
    let repository = new Repository();
    res.send(repository.getPage());
});

app.listen(4040, function(){
    console.log('listening on http://localhost:4040/');
});

