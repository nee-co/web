var toEvent    = require("neeco/api/event/toEvent")
var toURIQuery = require("neeco/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    query,
    entried,
    owned,
    offset,
    limit
}) => {
    var response = await fetch((
        entried ? (apiHost + "/events/entries")
      : owned   ? (apiHost + "/events/own")
      :           (apiHost + "/events/search")
    ) + "?" + toURIQuery({
        keyword: query,
        page   : "1",
        per    : limit
    }), {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    var {events} = await response.json()

    return events.map(toEvent)
}
