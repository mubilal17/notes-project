const setupBundleScripts = require('./setupBundleScripts');
const express = require('express');
const app = express();

app.use(express.static('client/public'));
setupBundleScripts();

app.listen(4040, function(){
    console.log('listening on http://localhost:4040/');
});

