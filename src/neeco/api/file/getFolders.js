var environment = require("neeco/environment")

var uri = environment.api.host + "/folders"

module.exports = ({token, limit}) =>
    fetch(uri, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({folders}) => Promise.resolve(
        folders.map((x) => ({
            id       : x.id,
            name     : x.name,
            updatedAt: x.updated_at
        }))
    ))
