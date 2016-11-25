var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/token"

module.exports = ({userName, password}) =>
    fetch(uri, {
        method : "POST",
        body   : toFormData({
            number  : userName,
            password: password
        })
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
