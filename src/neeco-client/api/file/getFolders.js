let toFileList = require("neeco-client/api/file/toFileList")

module.exports = async ({
    apiHost,
    token,
    limit,
    offset
}) => {
    let response = await fetch(
        apiHost + "/folders",
        {
            method : "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response

    return toFileList(await response.json())
}
