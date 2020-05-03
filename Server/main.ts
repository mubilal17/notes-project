const setupBundleScripts = require('./SetupBundle');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

import {WorkspaceController} from './controllers/WorkspaceController';

app.use(express.static('Public'));
setupBundleScripts();
app.use('/workspace', WorkspaceController);


app.listen(PORT, function(){
    console.log(`listening on http://localhost:${PORT}/`);
});

