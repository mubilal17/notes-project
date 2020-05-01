const fs = require('fs');
const babelify = require('babelify');
const watchify = require('watchify');
const browserify = require('browserify');



const entryPointReactScripts = './client/React-Components/page.js';



function setupBrowserifyBundle(scriptPaths, bundleName)
{
    const browserifyOpts = {
        debug: true,
        plugin: [watchify]
    };

    let bundle = browserify(scriptPaths, browserifyOpts);
    let updateBundle =  function() {
        console.log('Updating ' + bundleName + '.');
        bundle.bundle()
            .on('error', err => console.log('Got Error Bundling ' + bundleName + ': ' + err.message))
            .pipe(fs.createWriteStream('build/public/scripts/' + bundleName));
    };

    bundle.transform(babelify)
        .on('error', err => console.log('Got Error Bundling ' + bundleName + ': ' + err.message))
        .on('update', updateBundle);

    updateBundle();
}

module.exports = function(){
    setupBrowserifyBundle(entryPointReactScripts, 'bundle.js');
};