module.exports = async ({
    apiHost,
    token,
    folder
}) => {
    let response = await fetch(
        apiHost + "/folders/" + folder.id,
        {
            method : "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    if (! response.ok)
        throw response
}
