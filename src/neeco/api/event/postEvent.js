var toFormData  = require("neeco/core/toFormData")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/events"

module.exports = ({
    token,
    title,
    start_time,
    end_time,
    location,
    description,
    image
}) =>
    fetch(uri, {
        method : "POST",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            title            : title,
            started_at       : start_time,
            ended_at         : end_time,
            venue            : location,
            body             : description,
            event_image      : image,
            entry_upper_limit: 10,
        })
    })
    .then(response => response.ok)
