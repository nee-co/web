module.exports = async ({
    apiHost,
    eventID,
    token,
    userID
}) => {
    let response = await fetch(apiHost + "/events/" + eventID + (userID ? "/users/" : "/entry"), {
        method : "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    return response
}
