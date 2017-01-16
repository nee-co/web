let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    image
}) => {
    let response = await fetch(apiHost + "/user/image", {
        method : "PATCH",
        headers: {
            "Authorization": "Bearer " + token
        },
        body   : toFormData({
            "image": image
        })
    })

    if (! response.ok)
        throw response

    return response
}
