const path = require('path');
const HtmlWebbpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname,"/dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js",".jsx",".json",".ts",".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebbpackPlugin({
            template: "./src/index.html"
        })
    ]
}