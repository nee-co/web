let toUser = require("neeco/api/user/toUser")

module.exports = async ({
    apiHost,
    token,
    id
}) => {
    let response = await fetch(apiHost + "/users/" + id, {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response
    
    return toUser(await response.json())
}
