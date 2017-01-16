let toFile     = require("neeco/api/file/toFile")
let toFormData = require("neeco/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    file,
    parentID
}) => {
    let response = await fetch(apiHost + "/files", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: toFormData({
            "file"     : file,
            "parent_id": parentID
        })
    })

    if (! response.ok)
        throw response

    return toFile(object.assign({type: "file"}, await response.json()))
}
