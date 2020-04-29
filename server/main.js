const fs = require('fs');
const babelify = require('babelify');
const reactify = require('reactify');
const browserify = require('browserify');
const watchify = require('watchify');
const express = require('express');
const app = express();

app.use(express.static('client/public'));

const reactScripts = [
    'navbar.js',
    'sidebar.d/sidebar-link.js',
    'sidebar.d/sidebar.js',
    'editor.d/editor-elements/document-page.js',
    'editor.d/editor-elements/title.js',
    'editor.d/editor.js',
    'page.js'
].map( scriptName => {
    return './client/React-Components/' + scriptName;
});

const browserifyOpts = {
    debug: true,
    plugin: [watchify]
};

var bundle = browserify(reactScripts, browserifyOpts);

let updateBundle =  () =>
{
    bundle.bundle()
        .on('error', err => console.log('got error: ' + err.message))
        .pipe(fs.createWriteStream('./client/public/scripts/bundle.js'));
}

bundle
    .transform(babelify)
    .on('error', err => console.log('got error: ' + err.message))
    .on('update', updateBundle);



updateBundle();


app.listen(4040, function(){
    console.log('listening on http://localhost:4040/');
});

