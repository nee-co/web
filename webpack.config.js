let path           = require("path")
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
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules      : true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")
                            ]
                        }
                    }
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                "transform-object-rest-spread"
                            ],
                            presets: [
                                "latest",
                                "react"
                            ]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename  : "[name]",
        path      : path.resolve(__dirname, "build"),
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
        extensions: [".css", ".js", ".jsx"],
        modules: ["src", "node_modules"]
    }
}
