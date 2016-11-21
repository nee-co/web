import toFormData  from "neeco/core/toFormData"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/user/password"

export default ({token, password, newPassword}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            current_password: password,
            new_password    : newPassword
        })
    })
    .then(response => response.ok)
