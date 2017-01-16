let toFile = require("neeco/api/file/toFile")

module.exports = async ({
    apiHost,
    token,
    limit
}) => {
    let response = await fetch(apiHost + "/folders", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    let {folders} = await response.json()

    return folders.map(toFile)
}
