let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    note
}) => {
    let response = await fetch(apiHost + "/user/note", {
        method : "PATCH",
        headers: {
            "Authorization": "Bearer " + token
        },
        body   : toFormData({
            "note": note
        })
    })

    if (! response.ok)
        throw response
    
    return response
}
