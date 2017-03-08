let toEvent    = require("neeco-client/api/response/toEvent")
let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        if (self.event.isPublic !== undefined) {
            let response = await fetch(
                client.api.url + "/events/" + self.event.id + (
                    self.event.isPublic ? "/public"
                  :                       "/private"
                ),
                {
                    method : "PUT",
                    headers: {
                        "Authorization": "Bearer " + client.api.token
                    }
                }
            )
        }

        let response = await fetch(
            client.api.url + "/events/" + self.event.id,
            {
                method : "PATCH",
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

        let response2 = await fetch(
            client.api.url + "/events/" + self.event.id,
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response2.ok)
            throw response2

        return toEvent(await response2.json())
    },
    self
)
