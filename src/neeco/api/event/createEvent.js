let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    title,
    startDate,
    description,
    image
}) => {
    let response = await fetch(apiHost + "/events", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body   : toFormData({
            "title"     : title,
            "start_date": startDate,
            "body"      : description,
            "image"     : image
        })
    })

    if (! response.ok)
        throw response

    return response
}
