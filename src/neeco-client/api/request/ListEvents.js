let toEventList = require("neeco-client/api/response/toEventList")
let toURIQuery  = require("neeco-client/encoding/toURIQuery")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            (
                self.entried ? (client.api.url + "/events/entries?")
              : self.owned   ? (client.api.url + "/events/own?")
              :                (client.api.url + "/events/search?")
            ) + toURIQuery({
                keyword: self.query,
                page   : self.page,
                per    : self.perPage,
                limit  : self.limit,
                offset : self.offset
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

        return toEventList(await response.json())
    },
    self
)
