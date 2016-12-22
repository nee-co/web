var toFormData = require("neeco/encoding/toFormData")

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
    var response = await fetch(apiHost + "/events/" + id, {
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

    if (typeof isPublic != "undefined") {
        if (isPublic)
            var response = await fetch(apiHost + "/events/" + id + "/public", {
                method : "PUT",
                headers: {
                    authorization: "Bearer " + token
                }
            })
        else
            var response = await fetch(apiHost + "/events/" + id + "/private", {
                method : "PUT",
                headers: {
                    authorization: "Bearer " + token
                }
            })
    }    
}
