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
            authorization: "Bearer " + token
        }
    })

    var {events} = await response.json()

    return events.map((event) => ({
        id         : event.id,
        title      : event.title,
        description: event.body,
        image      : event.image,
        startDate  : event.start_date,
        isPublic   : event.isPublic,
        owner      : event.owner,
        entries    : event.entries,
        comments   : event.comments
    }))
}
