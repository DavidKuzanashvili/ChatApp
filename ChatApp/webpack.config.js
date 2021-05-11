"use strict";
const path = require('path');
const webpack = require('webpack');

// create multiple configs if u want multiple output paths
// see: https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config

module.exports = {
    mode: "development",
    devtool: false,
    plugins: [new webpack.SourceMapDevToolPlugin({})],
    entry: {
        app: ['./wwwroot/src/js/app.js', './wwwroot/src/scss/app.scss' ],
        home: ['./wwwroot/src/js/pages/home.js', './wwwroot/src/scss/pages/home.scss' ],
        chat: ['./wwwroot/src/js/pages/chat.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css'
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }
            ]
        }]
    }
};