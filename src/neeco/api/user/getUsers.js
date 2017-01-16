let toUser = require("neeco/api/user/toUser")

module.exports = async ({
    apiHost,
    token,
    offset,
    limit
}) => {
    let response = await fetch(apiHost + "/users", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    let {users} = await response.json()

    return users.map((x) => toUser(x))
}
