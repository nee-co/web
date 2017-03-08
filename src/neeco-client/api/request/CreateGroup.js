let toGroup    = require("neeco-client/api/response/toGroup")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                },
                body: toFormData({
                    "name"      : self.group.name,
                    "image"     : self.group.image,
                    "note"      : self.group.note,
                    "is_private": !self.group.isPublic
                })
            }
        )

        if (! response.ok)
            throw response

        return toGroup(await response.json())
    },
    self
)
