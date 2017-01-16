let toFile = (x) => ({
    kind     : x["type"],
    id       : x["id"],
    name     : x["name"],
    createdAt: x["created_at"],
    createdBy: x["created_user"],
    updatedAt: x["updated_at"],
    updatedBy: x["updated_user"],
    children : x["elements"] && x["elements"].map(toFile)
})

module.exports = toFile
