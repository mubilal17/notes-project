const fs = require('fs');
const babelify = require('babelify');
const watchify = require('watchify');
const browserify = require('browserify');

const editorBundle = [
    'navbar.js',
    'editor.d/editor-elements/document-page.js',
    'editor.d/editor-elements/title.js',
    'editor.d/editor.js',

].map( scriptName => {
    return './client/React-Components/' + scriptName;
});

const sidebarScripts = [
    'sidebar.d/sidebar-link.js',
    'sidebar.d/sidebar.js',
].map( scriptName => {
    return './client/React-Components/' + scriptName;
});

const pageBundle = [
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
        .on('update', updateBundle);

    updateBundle();
}

module.exports = function(){

    setupBrowserifyBundle(editorBundle, 'editorBundle.js');
    setupBrowserifyBundle(sidebarScripts, 'sidebarBundle.js');
    setupBrowserifyBundle(pageBundle, 'pageBundle.js');
};