module.exports = async ({
    apiHost,
    eventID,
    token,
    userID
}) => {
    var response = await fetch(apiHost + "/events/" + eventID + (userID ? "/users/" : "/entry"), {
        method : "PUT",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return response
}
