let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    userName,
    password,
}) => {
    let response = await fetch(
        token ? new Request(
            apiHost + "/token/refresh",
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
      :         new Request(
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

