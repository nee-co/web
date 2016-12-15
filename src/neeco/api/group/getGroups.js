module.exports = async ({
    apiHost,
    token,
    joined
}) => {
    var response = await fetch(apiHost + "/groups", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })

    var {groups} = await response.json()
     
    return groups.map(
        x => ({
            id     : x.id,
            number : x.number,
            name   : x.name,
            image  : x.image,
            college: x.college
        })
    )
}
