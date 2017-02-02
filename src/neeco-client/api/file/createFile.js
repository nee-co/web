let toFile     = require("neeco-client/api/file/toFile")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = async ({
    apiHost,
    token,
    parent,
    file
}) => {
    let response = await fetch(apiHost + "/files", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: toFormData({
            "file"     : file,
            "parent_id": parent.id
        })
    })

    if (! response.ok)
        throw response

    return toFile(object.assign({type: "file"}, await response.json()))
}
