let toEvent    = require("neeco-client/api/response/toEvent")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/events",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                },
                body   : toFormData({
                    "title"     : self.event.title,
                    "start_date": self.event.startDate,
                    "body"      : self.event.description,
                    "image"     : self.event.image
                })
            }
        )

        if (! response.ok)
            throw response

        return toEvent(await response.json())
    },
    self
)
