module.exports = async ({
    apiHost,
    token
}) => {
    let response = await fetch(apiHost + "/token/refresh", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    let {token} = await response.json()

    return token
}
