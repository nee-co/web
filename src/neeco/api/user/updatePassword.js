var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/user/password"

module.exports = ({token, password, newPassword}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            current_password: password,
            new_password    : newPassword
        })
    })
    .then(response => response.ok)
