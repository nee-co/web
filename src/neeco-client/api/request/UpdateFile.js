let toFile     = require("neeco-client/api/response/toFile")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/files/" + self.file.id,
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + client.api.token,
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body   : toURIQuery({
                    "name": self.file.name
                })
            }
        )

        if (! response.ok)
            throw response

        return toFile(await response.json())
    },
    self
)
