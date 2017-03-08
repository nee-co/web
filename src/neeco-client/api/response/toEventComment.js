let toUser = require("neeco-client/api/response/toUser")

module.exports = x => ({
    body    : x["body"],
    postedAt: x["posted_at"],
    postedBy: x["user"] && toUser(x["user"])
})
