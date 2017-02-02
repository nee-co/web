let toFile     = require("neeco-client/api/file/toFile")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    parent,
    folder
}) => {
    let response = await fetch(
        apiHost + "/folders",
        {
            method : "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body   : toURIQuery({
                "name"     : folder.name,
                "parent_id": parent.id
            })
        }
    )

    if (! response.ok)
        throw response

    return toFile(Object.assign({type: "folder"}, await response.json()))
}
