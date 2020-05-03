const setupBundleScripts = require('./setupBundleScripts');
const express = require('express');
const app = express();
import {Repository} from './data/repository';
import {WorkspaceController} from './controllers/WorkspaceController';

app.use(express.static('client/public'));
app.use(express.static('build/public'))
setupBundleScripts();
app.use('/workspace', WorkspaceController);


app.listen(4040, function(){
    console.log('listening on http://localhost:4040/');
});

