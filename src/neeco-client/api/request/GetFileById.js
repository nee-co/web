let toFile = require("neeco-client/api/response/toFile")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/files/" + self.file.id,
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return toFile(await response.json())
    },
    self
)