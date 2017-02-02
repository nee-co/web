let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    id,
    title,
    startDate,
    description,
    image,
    isPublic
}) => {
    let response = await fetch(apiHost + "/events/" + id, {
        method : "PATCH",
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

    if (isPublic !== undefined) {
        let response = await fetch(apiHost + "/events/" + id + (isPublic ? "/public" : "/private"), {
            method : "PUT",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }    
}
