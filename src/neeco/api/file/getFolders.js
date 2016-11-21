import toURIQuery  from "neeco/core/toURIQuery"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/folders"

export default ({token}) =>
    fetch(uri, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({folders}) => Promise.resolve(
        folders.map((x) => ({
            id       : x.id,
            name     : x.name,
            updatedAt: x.updated_at
        }))
    ))
