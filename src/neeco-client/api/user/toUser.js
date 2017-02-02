let toCollege = require("neeco-client/api/user/toCollege")

module.exports = (user) => ({
    id     : user["id"],
    number : user["number"],
    name   : user["name"],
    note   : user["note"],
    image  : user["image"],
    college: user["college"] && toCollege(user["college"])
})
