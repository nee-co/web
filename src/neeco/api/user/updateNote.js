var toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    note
}) => {
    var response = await fetch(apiHost + "/user/note", {
        method : "PATCH",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            note: note
        })
    })
    
    return response
}
