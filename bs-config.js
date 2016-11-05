var historyApiFallback = require('connect-history-api-fallback')

module.exports = {
    files: "build/*",
    logFileChanges: false,
    middleware: [historyApiFallback()],
    server: {
        baseDir: ["assets", "build"]
    },
    ui: false
}
