import "whatwg-fetch"

var uri = "/login/auth";

export default (number, password) => {
    d = new FormData()
    d.append("number", number)
    d.append("password", password)

    return fetch(uri, {
        method: 'POST',
        body: d
    }).then(response => {
        return response.json()
    })
}
