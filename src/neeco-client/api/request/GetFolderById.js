let toFile = require("neeco-client/api/response/toFile")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/folders/" + self.id,
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        let x = await response.json()

        return toFile({
            "type"    : "folder",
            "elements": x["elements"],
            "parents" : x["parents"].slice(0, -1),
            ...x["current_folder"]
        })
    },
    self
)
