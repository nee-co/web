import toFormData  from "neeco/core/toFormData"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/user/note"

export default ({token, note}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            note: note
        })
    })
    .then(response => response.ok)
