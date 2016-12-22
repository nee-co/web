module.exports = async ({
    apiHost,
    token,
    id
}) => {
    var response = await fetch(apiHost + "/users/" + id, {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    
    var user = await response.json()

    return user
}
