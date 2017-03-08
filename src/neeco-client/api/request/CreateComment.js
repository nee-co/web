let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/events/" + self.event.id + "/comments",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token,
                },
                body: toFormData({
                    "body": self.comment.body
                })
            }
        )

        if (! response.ok)
            throw response

        return response
    },
    self
)
