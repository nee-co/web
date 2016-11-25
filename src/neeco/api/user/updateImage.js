var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/user/image"

module.exports = ({token, image}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            image: image
        })
    })
    .then(response => response.ok)
