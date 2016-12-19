var toEvent = require("neeco/api/event/toEvent")

module.exports = async ({
    apiHost,
    token,
    id
}) => {
    var response = await fetch(apiHost + "/events/" + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })

    var event = await response.json()

    return toEvent(event)
}
