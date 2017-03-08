module.exports = x => ({
    id      : x["id"],
    name    : x["name"] || x["title"],
    note    : x["note"],
    image   : x["image"],
    isPublic: !x["is_private"]
})
