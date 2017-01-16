module.exports = async ({
    apiHost,
    token,
    joined
}) => {
    let response = await fetch(apiHost + "/groups", {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    let {groups} = await response.json()
     
    return groups
}
