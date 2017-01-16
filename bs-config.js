let historyApiFallback = require('connect-history-api-fallback')

module.exports = {
    files: "build/*",
    logFileChanges: false,
    middleware: [historyApiFallback()],
    notify: false,
    server: {
        baseDir: ["assets", "build"]
    },
    ui: false
}
