let toUserList = require("neeco-client/api/response/toUserList")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id + "/members?" + toURIQuery({
                limit : self.limit,
                offset: self.offset
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
