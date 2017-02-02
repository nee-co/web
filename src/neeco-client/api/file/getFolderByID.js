let toFile = require("neeco-client/api/file/toFile")

module.exports = async ({
    apiHost,
    token,
    id
}) => {
    let response = await fetch(
        apiHost + "/folders/" + id,
        {
            method : "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response

    let x = await response.json()

    return toFile(Object.assign(
        {
            "type"    : "folder",
            "elements": x["elements"]
        },
        x["current_folder"]
    ))
}
