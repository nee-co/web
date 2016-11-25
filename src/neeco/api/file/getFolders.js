var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/folders"

module.exports = ({token}) =>
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
