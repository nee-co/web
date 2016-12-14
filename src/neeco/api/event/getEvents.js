var toURIQuery = require("neeco/encoding/toURIQuery")

module.exports = ({
    apiHost,
    token,
    offset,
    limit
}) =>
    fetch(apiHost + "/events?" + toURIQuery({
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
