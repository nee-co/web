let toGroup = require("neeco-client/api/response/toGroup")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id,
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return toGroup(await response.json())
    },
    self
)
