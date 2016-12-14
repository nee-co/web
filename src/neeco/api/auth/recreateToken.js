var environment = require("neeco/environment")

var uri = environment.api.host + "/token/refresh"

module.exports = ({token}) =>
    fetch(uri, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
