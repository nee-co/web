var toFile = require("neeco/api/file/toFile")

module.exports = async ({
    apiHost,
    token,
    limit
}) => {
    var response = await fetch(apiHost + "/folders", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    var {folders} = await response.json()

    return folders.map(toFile)
}
