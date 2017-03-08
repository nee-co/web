module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/events/" + self.event.id + (
                self.user ? "/users/" + self.user.id
              :             "/entry"
            ),
            {
                method : "DELETE",
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
