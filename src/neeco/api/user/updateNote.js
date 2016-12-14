var toFormData  = require("neeco/encoding/toFormData")

module.exports = ({
    apiHost,
    token,
    note
}) =>
    fetch(apiHost + "/user/note", {
        method : "PATCH",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            note: note
        })
    })
        .then(response => response.ok)
