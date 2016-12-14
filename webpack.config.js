var HtmlWebpackPlugin = require("html-webpack-plugin")
var {DefinePlugin}    = require("webpack")

module.exports = {
    entry: {
        "js/main.js": [
            "babel-polyfill",
            "whatwg-fetch",
            "main"
        ]
    },
    module: {
        loaders: [
            {
                loader: "style!css?modules&importLoaders=1",
                test: /\.css$/
            },
            {
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    plugins: [
                        "transform-async-to-generator"
                    ],
                    presets: [
                        "es2015",
                        "react"
                    ]
                },
                test: /\.jsx?$/
            }
        ]
    },
    output: {
        filename: "[name]",
        path: "build",
        publicPath: "/"
    },
    plugins: [
        new DefinePlugin({
            process: {
                env: {
                    NODE_ENV      : JSON.stringify(process.env.NODE_ENV),
                    NEECO_API_HOST: JSON.stringify(process.env.NEECO_API_HOST || "https://api.neec.ooo")
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: "src/neeco/index.html"
        })
    ],
    resolve: {
        extensions: ["", ".css", ".js", ".jsx"],
        modulesDirectories: ["src", "node_modules"]
    }
}
