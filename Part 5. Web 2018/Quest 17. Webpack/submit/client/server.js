const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const comiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.listen(3000, () => {
    console.log("EXAMPLE APP LISTENING ON PORT 3000! \n")
})