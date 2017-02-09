let toUser = require("neeco-client/api/user/toUser")

module.exports = x => ({
    body    : x["body"],
    postedAt: x["posted_at"],
    postedBy: x["user"] && toUser(x["user"])
})
