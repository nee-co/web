let toGroup = require("neeco-client/api/group/toGroup")

module.exports = x => Object.assign(
    (x["groups"] || x["elements"]).map(toGroup),
    {
        totalCount: x["total_count"]
    }
)
