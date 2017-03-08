module.exports = self => Object.assign(
    async client => {
        let response = await fetch(
            client.api.url + "/groups/" + self.group.id + (
                self.user ? "/users/" + self.user.id
              :             "/join"
            ),
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
