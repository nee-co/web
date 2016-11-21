import toFormData  from "neeco/core/toFormData"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/user/image"

export default ({token, image}) =>
    fetch(uri, {
        method : "PATCH",
        headers: {
            "authorization": "Bearer " + token
        },
        body   : toFormData({
            image: image
        })
    })
    .then(response => response.ok)
