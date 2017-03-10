let toEvent = require("neeco-client/api/response/toEvent")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/events/" + self.id,
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return toEvent(await response.json())
    },
    self
)
