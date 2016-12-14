var toURIQuery  = require("neeco/core/toURIQuery")
var environment = require("neeco/environment")

var uris = {
    searchEvents       : environment.api.host + "/events/search",
    searchEntriedEvents: environment.api.host + "/events/entries",
    searchOwnedEvents  : environment.api.host + "/events/own"
}

module.exports = ({token, query, entried, owned, offset, limit}) =>
    fetch((
        entried ? uris.searchEntriedEvents
      : owned   ? uris.searchOwnedEvents
      :           uris.searchEvents
    ) + "?" + toURIQuery({
        keyword: query,
        page   : "1",
        per    : limit
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
            startDate  : x.start_date,
        }))
    ))
