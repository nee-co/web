module.exports = ({
    apiHost,
    token,
    limit
}) =>
    fetch(apiHost + "/folders", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({folders}) => Promise.resolve(
        folders.map((x) => ({
            id       : x.id,
            name     : x.name,
            updatedAt: x.updated_at
        }))
    ))
