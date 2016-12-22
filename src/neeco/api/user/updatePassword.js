var toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    password,
    newPassword
}) => {
    var response = await fetch(apiHost + "/user/password", {
        method : "PATCH",
        headers: {
            "Authorization": "Bearer " + token
        },
        body   : toFormData({
            "current_password": password,
            "new_password"    : newPassword
        })
    })
    
    return response
}
