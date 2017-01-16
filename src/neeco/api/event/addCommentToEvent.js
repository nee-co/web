let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    comment,
    eventID,
    token
}) => {
    let response = await fetch(apiHost + "/events/" + eventID + "/comments", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: toFormData({
            "body": comment.body
        })
    })

    if (! response.ok)
        throw response

    return response
}
