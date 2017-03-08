module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/events/" + self.event.id,
            {
                method : "DELETE",
                headers: {
                    "Authorization": "Bearer " + client.api.token
                }
            }
        )

        if (! response.ok)
            throw response
    },
    self
)
