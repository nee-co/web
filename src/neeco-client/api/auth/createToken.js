let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    userName,
    password,
}) => {
    let response = await (
        token ? fetch(
            apiHost + "/token/refresh",
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
      :         fetch(
            apiHost + "/token",
            {
                method: "POST",
                body  : toFormData({
                    "number"  : userName,
                    "password": password
                })
            }
        )
    )

    if (! response.ok)
        throw response

    let o = await response.json()

    return o.token
}

