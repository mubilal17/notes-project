const VueLoaderPlugin = require('vue-loader/lib/plugin')
var path = require('path');

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve('../Notes/wwwroot/'),
        filename: "bundle.js",
    },
    context: path.resolve('src'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}