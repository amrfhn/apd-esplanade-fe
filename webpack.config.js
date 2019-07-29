const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        // Create new HTMLWebpackPlugin with options
        return new HTMLWebpackPlugin({
            minify: false,
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/pug/pages')

module.exports = [{
    mode: 'development',
    entry: {
        app: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./assets/microsites/offstage/js/bundle.js",
    },
    devServer: {
        writeToDisk: true,
        port: 3000,
        contentBase: './dist',
        historyApiFallback: {
            index: 'index.html'
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyPlugin([
            // { from: './src/img', to: './assets/img' },
            // { from: './src/fonts', to: './assets/fonts' },
            { from: './src/js/data', to: './assets/microsites/offstage/data' },
            { from: './src/img', to: './assets/microsites/offstage/img' },
            { from: './src/fonts', to: './assets/microsites/offstage/fonts' },
            { from: './src/js/data', to: './assets/microsites/offstage/data'},
        ]),
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{ loader: "pug-loader", options: { pretty: true } }]
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/'
                }
            },
            {
                test: /\.(svg|gif|img|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img/'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            }
        ],
    },
    watch: true
},
{
    mode: 'production',
    entry: {
        app: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./assets/microsites/offstage/js/bundle.js",
    },
    devServer: {
        disableHostCheck: true,
        allowedHosts: [
            '.esplanade.growthopsapp.com',
        ],
        writeToDisk: true,
        port: 3000,
        contentBase: './dist',
        historyApiFallback: {
            index: 'index.html'
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyPlugin([
            // { from: './src/img', to: './assets/img' },
            // { from: './src/fonts', to: './assets/fonts' },
            { from: './src/js/data', to: './assets/microsites/offstage/data' },
            { from: './src/img', to: './assets/microsites/offstage/img' },
            { from: './src/fonts', to: './assets/microsites/offstage/fonts' },
            { from: './src/js/data', to: './assets/microsites/offstage/data'},
        ]),
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{ loader: "pug-loader", options: { pretty: true } }]
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/'
                }
            },
            {
                test: /\.(svg|gif|img|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img/'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            }
        ],
    },
    watch: false
}];