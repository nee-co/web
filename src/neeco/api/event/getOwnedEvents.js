var toURIQuery  = require("neeco/core/toURIQuery")
var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/events/own"

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
            image      : x.event_image,
            start_time : x.started_at,
            end_time   : x.ended_at,
            location   : x.venue,
            limit      : x.entry_upper_limit
        }))
    ))
