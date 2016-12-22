module.exports = async ({
    apiHost,
    token
}) => {
    var response = await fetch(apiHost + "/token/refresh", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    var {token} = await response.json()

    return token
}
