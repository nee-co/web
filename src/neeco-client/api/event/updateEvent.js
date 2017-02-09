let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    event
}) => {
    let response = await fetch(
        apiHost + "/events/" + event.id,
        {
            method : "PATCH",
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

    if (event.isPublic !== undefined) {
        let response = await fetch(
            apiHost + "/events/" + event.id + (
                event.isPublic ? "/public"
              :                  "/private"
            ),
            {
                method : "PUT",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }    
}
