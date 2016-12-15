module.exports = async ({
    apiHost,
    token,
    offset,
    limit
}) => {
    var response = await fetch(apiHost + "/users", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })

    var {users} = await response.json()
    
    return users
}
