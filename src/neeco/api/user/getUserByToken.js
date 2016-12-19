module.exports = async ({
    apiHost,
    token
}) => {
    var response = await fetch(apiHost + "/user", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    
    var user = await response.json()
    
    return user
}
