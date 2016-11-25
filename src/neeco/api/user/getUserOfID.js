var environment = require("neeco/environment")
require("whatwg-fetch")

var uri = environment.api.host + "/users"

module.exports = ({token, id}) =>
    fetch(uri + "/" + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(user => Promise.resolve({
        id     : user.id,
        number : user.number,
        name   : user.name,
        image  : user.image,
        college: user.college
    }))
