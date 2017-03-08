let toFile     = require("neeco-client/api/response/toFile")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/folders",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token,
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body   : toURIQuery({
                    "name"     : self.folder.name,
                    "parent_id": self.parent.id
                })
            }
        )

        if (! response.ok)
            throw response

        return toFile({
            type: "folder",
            ... await response.json()
        })
    },
    self
)
