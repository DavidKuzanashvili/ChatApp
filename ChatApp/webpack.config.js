"use strict";
const path = require('path');
const bundleFileName = 'app';

module.exports = {
    mode: "development",
    entry: ['./wwwroot/src/js/index.js', './wwwroot/src/scss/index.scss'],
    output: {
        filename: bundleFileName + '.js',
        path: path.resolve(__dirname, 'wwwroot/dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: bundleFileName + '.css'
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