let toURIQuery  = require("neeco-client/encoding/toURIQuery")
let toGroupList = require("neeco-client/api/group/toGroupList")

module.exports = async ({
    apiHost,
    token,
    query,
    limit,
    offset,
    page,
    per,
    isElement
}) => {
    let response = await fetch(
        apiHost + (
            isElement ? "/groups?"
          :             "/groups/search?"
        ) + toURIQuery({
            keyword: query,
            page   : page,
            per    : per,
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

    return toGroupList(await response.json())
}
