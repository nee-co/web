module.exports = async ({
    apiHost,
    token,
    joined
}) => {
    var response = await fetch(apiHost + "/groups", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    var {groups} = await response.json()
     
    return groups
}
