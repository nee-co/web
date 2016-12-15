var toURIQuery = require("neeco/encoding/toURIQuery")

module.exports = async ({
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
            authorization: "Bearer " + token
        }
    })

    var {events} = await response.json()

    return events.map((x) => ({
        id         : x.id,
        title      : x.title,
        description: x.body,
        image      : x.image,
        startTime  : x.start_time
    }))
}
