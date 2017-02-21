let toUserList = require("neeco-client/api/user/toUserList")

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

    return toUserList(await response.json())
}
