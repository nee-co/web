import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/users/password"

export default ({token, password, newPassword}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "authorization": "Bearer " + token
        },
        body   : JSON.stringify({
            "current_password": password,
            "new_password"    : newPassword
        })
    })
    .then(response => response.ok)
