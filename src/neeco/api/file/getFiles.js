var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/folders/"

module.exports = ({token, id}) =>
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
