let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    userName,
    password
}) => {
    let response = await fetch(apiHost + "/token", {
        method: "POST",
        body  : toFormData({
            "number"  : userName,
            "password": password
        })
    })

    if (! response.ok)
        throw response

    let {token} = await response.json()

    return token
}

