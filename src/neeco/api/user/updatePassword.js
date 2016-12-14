var toFormData  = require("neeco/encoding/toFormData")

module.exports = ({
    apiHost,
    token,
    password,
    newPassword
}) =>
    fetch(apiHost + "/user/password", {
        method : "PATCH",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            current_password: password,
            new_password    : newPassword
        })
    })
        .then(response => response.ok)
