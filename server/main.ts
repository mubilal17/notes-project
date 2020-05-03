const setupBundleScripts = require('./setupBundleScripts');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

import {WorkspaceController} from './controllers/WorkspaceController';

app.use(express.static('client/public'));
app.use(express.static('build/public'))
setupBundleScripts();
app.use('/workspace', WorkspaceController);


app.listen(PORT, function(){
    console.log(`listening on http://localhost:${PORT}/`);
});

