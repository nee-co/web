import toFormData  from "neeco/core/toFormData"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/token"

export default ({userName, password}) =>
    fetch(uri, {
        method : "POST",
        body   : toFormData({
            number  : userName,
            password: password
        })
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
