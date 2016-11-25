var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/users"

module.exports = ({token}) =>
    fetch(uri, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({users}) => Promise.resolve(
        users.map(
            x => ({
                id     : x.id,
                number : x.number,
                name   : x.name,
                image  : x.image,
                college: x.college
            })
        )
    ))
