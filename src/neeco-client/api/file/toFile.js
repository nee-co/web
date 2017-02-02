let toUser = require("neeco-client/api/user/toUser")

let toFile = (x) => ({
    kind     : x["type"] || "folder",
    id       : x["id"],
    name     : x["name"],
    size     : x["size"],
    createdAt: x["created_at"],
    createdBy: x["created_user"] && toUser(x["created_user"]),
    updatedAt: x["updated_at"],
    updatedBy: x["updated_user"] && toUser(x["updated_user"]),
    children : x["elements"] && x["elements"].map(toFile)
})

module.exports = toFile
