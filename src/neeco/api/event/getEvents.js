import toURIQuery  from "neeco/core/toURIQuery"
import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/events/own"

export default ({token, offset, limit}) =>
    fetch(uri + "?" + toURIQuery({
        keyword: "test",
        page   : "1",
        per    : limit,
    }), {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({events}) => Promise.resolve(
        events.map((x) => ({
            id         : x.id,
            title      : x.title,
            description: x.body
        }))
    ))
