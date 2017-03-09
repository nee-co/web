let toUser     = require("neeco-client/api/response/toUser")
let toFormData = require("neeco-client/encoding/toFormData")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = self => Object.assign(
    async client => {
        let baseURl = self.user.id === undefined ? client.api.url + "/user"
                    :                              client.api.url + "/users/" + self.user.id

        if (self.user.password != undefined) {
            let response = await fetch(
                baseURl + "/password",
                {
                    method : "PATCH",
                    headers: {
                        "Authorization": "Bearer " + client.api.token,
                        "Content-Type" : "application/x-www-form-urlencoded"
                    },
                    body   : toURIQuery({
                        "current_password": self.user.currentPassword,
                        "new_password"    : self.user.password
                    })
                }
            )

            if (! response.ok)
                throw response
        }

        if (self.user.image != undefined) {
            let response = await fetch(
                baseURl + "/image",
                {
                    method : "POST",
                    headers: {
                        "Authorization": "Bearer " + client.api.token
                    },
                    body   : toFormData({
                        "image": self.user.image
                    })
                }
            )

            if (! response.ok)
                throw response
        }

        if (self.user.note !== undefined) {
            let response = await fetch(
                baseURl + "/note",
                {
                    method : "PATCH",
                    headers: {
                        "Authorization": "Bearer " + client.api.token
                    },
                    body   : toFormData({
                        "note": self.user.note
                    })
                }
            )

            if (! response.ok)
                throw response
        }

        let response = await fetch(
            baseURl,
            {
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
