let toEventComment = require("neeco-client/api/response/toEventComment")
let toUser         = require("neeco-client/api/response/toUser")

module.exports = x => ({
    id         : x["id"],
    title      : x["title"],
    description: x["body"],
    image      : x["image"],
    startDate  : x["start_date"] || (x["meta"] && x["meta"]["body"]),
    isPublic   : x["is_public"],
    owner      : x["owner"] && toUser(x["owner"]),
    entries    : x["entries"] && x["entries"].map(toUser),
    comments   : x["comments"] && x["comments"].map(toEventComment)
})
