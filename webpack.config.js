var HtmlWebpackPlugin = require("html-webpack-plugin")
var {DefinePlugin}    = require("webpack")

module.exports = {
    entry: {
        "js/main.js": "main"
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
                    presets: ["es2015", "react"]
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
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
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
