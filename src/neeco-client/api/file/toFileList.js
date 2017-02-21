let toFile = require("neeco-client/api/file/toFile")

module.exports = x => Object.assign(
    (x["folders"] || x["files"] || x["elements"]).map(toFile),
    {
        totalCount: x["total_count"]
    }
)
