var toFile     = require("neeco/api/file/toFile")
var toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    name,
    parentID
}) => {
    var response = await fetch(apiHost + "/folder", {
        method : "POST",
        headers: {
            authorization: "Bearer " + token
        },
        body: toFormData({
            name     : name,
            parent_id: parentID
        })
    })

    var x = await response.json()

    return toFile(x)
}
