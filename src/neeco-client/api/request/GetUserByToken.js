let toUser = require("neeco-client/api/response/toUser")

module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/user",
            {
                method : "GET",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response
        
        return toUser(await response.json())    
    },
    self
)
