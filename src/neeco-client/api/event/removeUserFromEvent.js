module.exports = async ({
    apiHost,
    event,
    token,
    user
}) => {
    let response = await fetch(
        apiHost + "/events/" + event.id + (
            user ? "/users/" + user.id
          :        "/entry"
        ),
        {
            method : "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response

    return response
}
