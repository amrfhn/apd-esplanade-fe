const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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

module.exports = {
    entry: {
        app: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
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
        })
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [{ loader: "pug-loader", options: { pretty: true } }]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            //     options: {
            //         // eslint options (if necessary)
            //     }
            // },
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
                test: /\.(s*)css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js/,
                loader: 'import-glob-loader'
            },
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            }
        ],
    },
    watch: true
};

// module.exports = (env, argv) => {
//     if (argv.mode === 'development') { }
//     if (argv.mode === 'production') { }
//     return config;
// }   