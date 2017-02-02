module.exports = async ({
    apiHost,
    token,
    file
}) => {
    let response = await fetch(
        (
            file.kind apiHost + "/folders/" + file.id
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
}
