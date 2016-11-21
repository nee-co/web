import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/token/refresh"

export default ({token}) =>
    fetch(uri, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
