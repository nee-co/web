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
    
    return users.map(x => ({
        id     : x.id,
        number : x.number,
        name   : x.name,
        image  : x.image,
        note   : x.note,
        college: x.college
    }))
}
