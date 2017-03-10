let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id + "/cancel",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                },
                body   : toFormData({
                    "user_id": self.user.id
                })
            }
        )

        if (! response.ok)
            throw response

        return response
    },
    self
)
