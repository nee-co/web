module.exports = async ({
    apiHost,
    token
}) => {
    var response = await fetch(apiHost + "/user", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    
    var user = await response.json()
    
    return user
}
