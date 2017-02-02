let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    comment,
    event,
    token
}) => {
    let response = await fetch(
        apiHost + "/events/" + event.id + "/comments",
        {
            method : "POST",
            headers: {
                "Authorization": "Bearer " + token,
            },
            body: toFormData({
                "body": comment.body
            })
        }
    )

    if (! response.ok)
        throw response

    return response
}
