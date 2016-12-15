module.exports = async ({
    apiHost,
    token,
    limit
}) => {
    var response = await fetch(apiHost + "/folders", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })

    var {folders} = await response.json()

    return folders.map((x) => ({
        id       : x.id,
        name     : x.name,
        updatedAt: x.updated_at
    }))
}
