let toUser = require("neeco-client/api/response/toUser")

let toFile = x => ({
    kind       : x["type"] || "folder",
    id         : x["id"],
    name       : x["name"],
    size       : x["size"],
    parents    : x["parents"] && x["parents"].map(y => ({
        id  : y["id"],
        name: y["name"]
    })),
    children   : x["elements"] && x["elements"].map(toFile),
    createdAt  : x["created_at"],
    createdBy  : x["created_user"] && toUser(x["created_user"]),
    updatedAt  : x["updated_at"],
    updatedBy  : x["updated_user"] && toUser(x["updated_user"]),
    downloadUrl: x["download_url"] && x["download_url"].replace(/^(.+?\/{2}.+?)\/{2}/, "$1/")
})

module.exports = toFile
