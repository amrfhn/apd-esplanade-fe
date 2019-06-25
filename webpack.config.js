const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs')


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

const config = {
    entry: {
        app: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{loader: "pug-loader", options: {pretty: true}}]
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader']
            }
        ]
    },

    watch: true
};
module.exports = (env, argv) => {
    if (argv.mode === 'development') { }
    if (argv.mode === 'production') { }
    return config;
}   