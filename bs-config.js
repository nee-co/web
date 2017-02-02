let historyApiFallback = require('connect-history-api-fallback')

module.exports = {
    files: "build/*",
    ghostMode: false,
    logFileChanges: false,
    middleware: [historyApiFallback()],
    notify: false,
    server: {
        baseDir: ["assets", "build"]
    },
    ui: false
}
