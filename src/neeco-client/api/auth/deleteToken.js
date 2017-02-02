module.exports = async ({
    apiHost,
    token
}) => {
    let response = await fetch(
        apiHost + "/token/revoke",
        {
            method : "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response

    return response
}
