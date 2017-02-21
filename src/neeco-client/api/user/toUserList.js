let toUser = require("neeco-client/api/user/toUser")

module.exports = x => Object.assign(
    (x["users"] || x["elements"]).map(toUser),
    {
        totalCount: x["total_count"]
    }
)
