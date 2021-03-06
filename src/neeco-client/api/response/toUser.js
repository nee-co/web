let toCollege = require("neeco-client/api/response/toCollege")

module.exports = x => ({
    id     : x["id"],
    number : x["number"],
    name   : x["name"],
    note   : x["note"],
    image  : x["image"],
    college: x["college"] && toCollege(x["college"])
})
