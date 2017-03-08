let toURIQuery = require("neeco-client/encoding/toURIQuery")
let toUserList = require("neeco-client/api/response/toUserList")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/users/search?" + toURIQuery({
                "name"      : self.query,
                "limit"     : self.limit,
                "offset"    : self.offset,
                "except_ids": ""
            }),
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return toUserList(await response.json())
    },
    self
)
