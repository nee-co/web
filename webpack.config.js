let {DefinePlugin} = require("webpack")

module.exports = {
    entry: {
        "main.js": [
            "babel-polyfill",
            "whatwg-fetch",
            "neeco-client/main"
        ],
        "ServiceWorker.js": [
            "babel-polyfill",
            "neeco-client/ServiceWorker"
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
                        "transform-object-rest-spread"
                    ],
                    presets: [
                        "latest",
                        "react"
                    ]
                },
                test: /\.jsx?$/
            }
        ]
    },
    output: {
        filename  : "[name]",
        path      : "build",
        publicPath: "/"
    },
    plugins: [
        new DefinePlugin({
            process: {
                env: {
                    NODE_ENV      : JSON.stringify(process.env.NODE_ENV),
                    NEECO_API_HOST: JSON.stringify(process.env.NEECO_API_HOST)
                }
            }
        })
    ],
    resolve: {
        extensions: ["", ".css", ".js", ".jsx"],
        modulesDirectories: ["src", "node_modules"]
    }
}
