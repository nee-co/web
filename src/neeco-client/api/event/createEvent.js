let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    event
}) => {
    let response = await fetch(
        apiHost + "/events",
        {
            method : "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body   : toFormData({
                "title"     : event.title,
                "start_date": event.startDate,
                "body"      : event.description,
                "image"     : event.image
            })
        }
    )

    if (! response.ok)
        throw response

    return response
}
