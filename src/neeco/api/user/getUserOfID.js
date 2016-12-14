var environment = require("neeco/environment")

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
            note   : user.note,
            college: user.college
        }))
