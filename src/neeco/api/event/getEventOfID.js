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

    return {
        id         : event.id,
        title      : event.title,
        description: event.body,
        image      : event.image,
        startDate  : event.start_date,
    }
}