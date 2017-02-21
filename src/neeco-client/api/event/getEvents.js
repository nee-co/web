let toEventList = require("neeco-client/api/event/toEventList")
let toURIQuery  = require("neeco-client/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    query,
    entried,
    owned,
    page,
    perPage,
    limit,
    offset
}) => {
    let response = await fetch(
        (
            entried ? (apiHost + "/events/entries?")
          : owned   ? (apiHost + "/events/own?")
          :           (apiHost + "/events/search?")
        ) + toURIQuery({
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

    return toEventList(await response.json())
}
