let toFile     = require("neeco-client/api/response/toFile")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/files",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                },
                body: toFormData({
                    "file"     : self.file,
                    "parent_id": self.parent.id
                })
            }
        )

        if (! response.ok)
            throw response

        return toFile(object.assign({type: "file"}, await response.json()))
    },
    self
)
