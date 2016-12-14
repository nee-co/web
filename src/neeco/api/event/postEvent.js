var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")

var uri = environment.api.host + "/events"

module.exports = ({
    token,
    title,
    startDate,
    description,
    image
}) =>
    fetch(uri, {
        method : "POST",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            title     : title,
            start_date: startDate,
            body      : description,
            image     : image
        })
    })
    .then(response => response.ok)
