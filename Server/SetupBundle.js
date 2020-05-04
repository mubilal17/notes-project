const fs = require('fs');
const babelify = require('babelify');
const tsify = require('tsify');
const watchify = require('watchify');
const browserify = require('browserify');



const entryPointReactScripts = './Client Scripts/App.tsx';


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
            .pipe(fs.createWriteStream('Public/scripts/' + bundleName));
    };

    bundle
        .plugin(tsify)
        .transform(babelify)
        .on('error', err => console.log('Got Error Bundling ' + bundleName + ': ' + err.message))
        .on('update', updateBundle);

    updateBundle();
}

module.exports = function(){
    setupBrowserifyBundle(entryPointReactScripts, 'bundle.js');
};