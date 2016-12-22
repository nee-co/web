var toEvent    = require("neeco/api/event/toEvent")
var toURIQuery = require("neeco/encoding/toURIQuery")

module.eeventports = async ({
    apiHost,
    token,
    offset,
    limit
}) => {
    var response = await fetch(apiHost + "/events?" + toURIQuery({
        page   : 1,
        per    : limit,
    }), {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    var {events} = await response.json()

    return events.map(toEvent)
}
