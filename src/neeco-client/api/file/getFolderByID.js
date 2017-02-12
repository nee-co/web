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

    return toFile({
        "type"    : "folder",
        "elements": x["elements"],
        "parents" : x["parents"].slice(0, -1),
        ...x["current_folder"]
    })
}
