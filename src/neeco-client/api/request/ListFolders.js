let toFileList = require("neeco-client/api/response/toFileList")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/folders",
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return toFileList(await response.json())
    },
    self
)
