var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/user/note"

module.exports = ({token, note}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            note: note
        })
    })
    .then(response => response.ok)
