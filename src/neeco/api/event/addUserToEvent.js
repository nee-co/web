module.exports = async ({
    apiHost,
    eventID,
    token,
    userID
}) => {
    let response = await fetch(apiHost + "/events/" + eventID + (userID ? "/users/" : "/entry"), {
        method : "PUT",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    if (! response.ok)
        throw response

    return response
}
