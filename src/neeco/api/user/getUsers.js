module.exports = ({
    apiHost,
    token,
    offset,
    limit
}) =>
    fetch(apiHost + "/users", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(({users}) => Promise.resolve(
            users.map(
                x => ({
                    id     : x.id,
                    number : x.number,
                    name   : x.name,
                    image  : x.image,
                    note   : x.note,
                    college: x.college
                })
            )
        ))
