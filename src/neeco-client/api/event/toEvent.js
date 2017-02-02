let toComment = require("neeco-client/api/event/toComment")
let toUser    = require("neeco-client/api/user/toUser")

module.exports = (x) => ({
    id         : x["id"],
    title      : x["title"],
    description: x["body"],
    image      : x["image"],
    startDate  : x["start_date"] || x["meta"]["body"],
    isPublic   : x["is_public"],
    owner      : x["owner"] && toUser(x["owner"]),
    entries    : x["entries"] && x["entries"].map(toUser),
    comments   : x["comments"] && x["comments"].map(toComment)
})
