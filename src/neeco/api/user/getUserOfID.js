module.exports = async ({
    apiHost,
    token,
    id
}) => {
    var response = await fetch(apiHost + "/users/" + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    
    var user = await response.json()

    return {
        id     : user.id,
        number : user.number,
        name   : user.name,
        image  : user.image,
        note   : user.note,
        college: user.college
    }
}
