let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    password,
    newPassword
}) => {
    let response = await fetch(apiHost + "/user/password", {
        method : "PATCH",
        headers: {
            "Authorization": "Bearer " + token
        },
        body   : toFormData({
            "current_password": password,
            "new_password"    : newPassword
        })
    })

    if (! response.ok)
        throw response
    
    return response
}
