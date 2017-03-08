let toFormData = require("neeco-client/encoding/toFormData")

module.exports = self => Object.assign(
    async client => {
        let response = await (
            client.api.token ? fetch(
                client.api.url + "/token/refresh",
                {
                    method : "GET",
                    headers: {
                        "Authorization": "Bearer " + client.api.token
                    }
                }
            )
          :                    fetch(
                client.api.url + "/token",
                {
                    method: "POST",
                    body  : toFormData({
                        "number"  : self.userName,
                        "password": self.password
                    })
                }
            )
        )

        if (! response.ok)
            throw response

        let o = await response.json()

        return o.token
    },
    self
)
