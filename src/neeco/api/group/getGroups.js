module.exports = ({
    apiHost,
    token,
    joined
}) =>
    fetch(apiHost + "/groups", {
        method : "GET",
        headers: {
            authorization: "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(({groups}) => Promise.resolve(
        groups.map(
            x => ({
                id     : x.id,
                number : x.number,
                name   : x.name,
                image  : x.image,
                college: x.college
            })
        )
    ))
