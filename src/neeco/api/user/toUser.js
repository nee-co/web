let toUser = require("neeco/api/user/toUser")

module.exports = (user) => ({
    id     : user["id"],
    number : user["number"],
    name   : user["name"],
    note   : user["note"],
    image  : user["image"],
    college: {
        code: user["college"]["code"],
        name: user["college"]["name"]
    }
})
