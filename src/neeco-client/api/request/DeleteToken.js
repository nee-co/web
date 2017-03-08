module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/token/revoke",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response

        return response
    },
    self
)
