var toFormData  = require("neeco/encoding/toFormData")

module.exports = ({
    apiHost,
    token,
    image
}) =>
    fetch(apiHost + "/user/image", {
        method : "PATCH",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            image: image
        })
    })
        .then(response => response.ok)
