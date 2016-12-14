module.exports = ({
    apiHost,
    token,
    id,
    limit
}) =>
    fetch(apiHost + "/folders/" + id, {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({files}) => Promise.resolve(
        files.map((x) => ({
            id       : x.id,
            name     : x.name,
            updatedAt: x.updated_at
        }))
    ))
