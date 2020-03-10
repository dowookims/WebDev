const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        app: ['babel-polyfill', './src/main.js'],
        vendor: ['axios']
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
        contentBase: './dist'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
        new ManifestPlugin({
            fileName: "manifest.json",
            basePath: "./dist"
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'KNOWRE PAD',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    enforce: true,
                }
            }
        }
    }
};