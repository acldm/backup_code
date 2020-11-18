const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpaclPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        // "main": "./src/main.js",
        "demo1": "./src/main.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpaclPlugin({
            title: 'pixi fly',
            template: 'src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /.(css)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader?name=images/[hash].[ext]',
                    options: {
                        limit: 8192
                    }
                }
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'json-loader'
                }
            }
        ]
    }
}