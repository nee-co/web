module.exports = async ({
    apiHost,
    token,
    id,
    limit
}) => {
    var response = await fetch(apiHost + "/folders/" + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    
    var {files} = await response.json()

    return files.map((x) => ({
        id       : x.id,
        name     : x.name,
        
        updatedAt: x.updated_at
    }))
}
