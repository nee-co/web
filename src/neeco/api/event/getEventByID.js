let toEvent = require("neeco/api/event/toEvent")

module.exports = async ({
    apiHost,
    token,
    id
}) => {
    let response = await fetch(apiHost + "/events/" + id, {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    let event = await response.json()

    return toEvent(event)
}
