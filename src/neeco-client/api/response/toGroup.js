module.exports = x => ({
    id         : x["id"],
    name       : x["name"] || x["title"],
    description: x["note"],
    image      : x["image"]
})
