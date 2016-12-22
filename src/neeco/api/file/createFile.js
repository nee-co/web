var toFile     = require("neeco/api/file/toFile")
var toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    file,
    parentID
}) => {
    var response = await fetch(apiHost + "/files", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: toFormData({
            "file"     : file,
            "parent_id": parentID
        })
    })

    var file = await response.json()

    return toFile(file)
}
