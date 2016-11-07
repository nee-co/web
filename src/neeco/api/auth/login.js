import environment from "neeco/environment"
import "whatwg-fetch"

var uri = environment.api.host + "/auth/login"

export default (id, password) =>
    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            number  : id,
            password: password
        })
    })
    .then(response => response.json())
