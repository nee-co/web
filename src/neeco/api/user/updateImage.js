var toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    image
}) => {
    var response = await fetch(apiHost + "/user/image", {
        method : "PATCH",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            image: image
        })
    })

    return response
}
