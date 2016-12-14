module.exports = ({
    apiHost,
    token
}) =>
    fetch(apiHost + "/token/refresh", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
