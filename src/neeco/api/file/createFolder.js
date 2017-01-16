let toFile     = require("neeco/api/file/toFile")
let toURIQuery = require("neeco/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    name,
    parentID
}) => {
    let response = await fetch(apiHost + "/folders", {
        method : "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body: toURIQuery({
            "name"     : name,
            "parent_id": parentID
        })
    })

    if (! response.ok)
        throw response

    return toFile(object.assign({type: "folder"}, await response.json()))
}
