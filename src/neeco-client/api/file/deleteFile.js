module.exports = async ({
    apiHost,
    token,
    file
}) => {
    let response = await fetch(
        apiHost + "/files/" + file.id,
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