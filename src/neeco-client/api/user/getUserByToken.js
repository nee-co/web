let toUser = require("neeco-client/api/user/toUser")

module.exports = async ({
    apiHost,
    token
}) => {
    let response = await fetch(
        apiHost + "/user",
        {
            method : "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response
    
    return toUser(await response.json())    
}
