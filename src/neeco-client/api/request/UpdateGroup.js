let toGroup    = require("neeco-client/api/response/toGroup")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id,
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                },
                body   : toFormData({
                    "name"      : self.group.name,
                    "note"      : self.group.note,
                    "image"     : self.group.image,
                    "is_private": self.group.isPrivate
                })
            }
        )

        if (! response.ok)
            throw response

        return toGroup(await response.json())
    },
    self
)
