var toURIQuery   = require("neeco/encoding/toURIQuery")

module.exports = ({
    apiHost,
    token,
    query,
    entried,
    owned,
    offset,
    limit
}) =>
    fetch((
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
