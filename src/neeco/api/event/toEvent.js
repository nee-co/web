let toUser = require("neeco/api/user/toUser")

module.exports = (event) => ({
    id         : event["id"],
    title      : event["title"],
    description: event["body"],
    image      : event["image"],
    startDate  : event["start_date"] || event["meta"]["body"],
    isPublic   : event["is_public"],
    owner      : event["owner"] && toUser(event["owner"]),
    entries    : event["entries"] && event["entries"].map(toUser),
    comments   : event["comments"] && event["comments"].map((x) => ({
        body    : x["body"],
        postedAt: x["posted_at"],
        postedBy: toUser(x["user"])
    }))
})
