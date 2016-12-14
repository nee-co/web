var environment = require("neeco/environment")

var uri = environment.api.host + "/folders/"

module.exports = ({token, id, limit}) =>
    fetch(uri + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({files}) => Promise.resolve(
        files.map((x) => ({
            id       : x.id,
            name     : x.name,
            updatedAt: x.updated_at
        }))
    ))
