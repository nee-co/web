module.exports = async ({
    apiHost,
    token
}) => {
    var response = await fetch(apiHost + "/token/refresh", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })

    var {token} = await response.json()

    return token
}