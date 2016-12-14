var toURIQuery  = require("neeco/core/toURIQuery")
var environment = require("neeco/environment")

var uri = environment.api.host + "/events"

module.exports = ({token, offset, limit}) =>
    fetch(uri + "?" + toURIQuery({
        page   : "1",
        per    : limit,
    }), {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({events}) => Promise.resolve(
        events.map((x) => ({
            id         : x.id,
            title      : x.title,
            description: x.body,
            image      : x.image,
            startTime  : x.start_time
        }))
    ))
