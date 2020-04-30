const fs = require('fs');
const babelify = require('babelify');
const watchify = require('watchify');
const browserify = require('browserify');

const bundle = [
    'sidebar.d/sidebar-link.js',
    'sidebar.d/sidebar.js',
    'navbar.js',
    'editor.d/editor-elements/document-page.js',
    'editor.d/editor-elements/title.js',
    'editor.d/editor.js',
    'page.js'

].map( scriptName => {
    return './client/React-Components/' + scriptName;
});



function setupBrowserifyBundle(scriptPaths, bundleName)
{
    const browserifyOpts = {
        debug: true,
        plugin: [watchify]
    };

    let bundle = browserify(scriptPaths, browserifyOpts);
    let updateBundle =  function() {
        bundle.bundle()
            .on('error', err => console.log('Got Error Bundling ' + bundleName + ': ' + err.message))
            .pipe(fs.createWriteStream('./client/public/scripts/' + bundleName));
    };

    bundle.transform(babelify)
        .bundle()
        .on('error', err => console.log('Got Error Bundling ' + bundleName + ': ' + err.message))
        .on('update', updateBundle)
        .pipe(fs.createWriteStream('./client/public/scripts/' + bundleName));
    updateBundle();
}

module.exports = function(){

    setupBrowserifyBundle(bundle, 'bundle.js');
};