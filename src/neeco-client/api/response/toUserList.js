let toUser = require("neeco-client/api/response/toUser")

module.exports = x => Object.assign(
    (x["users"] || x["elements"] || x["invitees"] || x["members"]).map(toUser),
    {
        totalCount: x["total_count"]
    }
)
