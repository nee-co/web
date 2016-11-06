import "whatwg-fetch"

var uri = "https://api.neec.ooo" + "/auth/login";

export default (id, password) =>
    fetch(uri, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            number  : id,
            password: password
        })
    })
    .then(response => response.json())
