let toUser = require("neeco-client/api/user/toUser")

module.exports = async ({
    apiHost,
    token,
    offset,
    limit
}) => {
    let response = await fetch(
        apiHost + "/users?" + toURIQuery({
            keyword: query,
            page   : page,
            per    : perPage,
            limit  : limit,
            offset : offset
        }),
        {
            method : "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response

    let {users} = await response.json()

    return users.map(toUser)
}
