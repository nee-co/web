let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id + "/invite",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user_ids": [self.user.id]
                })
            }
        )

        if (! response.ok)
            throw response

        return response
    },
    self
)
