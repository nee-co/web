var toFile     = require("neeco/api/file/toFile")
var toURIQuery = require("neeco/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    name,
    parentID
}) => {
    var response = await fetch(apiHost + "/folders", {
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

    var x = await response.json()

    return toFile(x)
}
