var toFile = require("neeco/api/file/toFile")

module.exports = async ({
    apiHost,
    token,
    id
}) => {
    var response = await fetch(apiHost + "/folders/" + id, {
        method : "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    var folder = await response.json()

    return {
        id       : folder["current_folder"]["id"],
        name     : folder["current_folder"]["name"],
        createdAt: folder["current_folder"]["created_at"],
        createdBy: folder["current_folder"]["created_user"],
        updatedAt: folder["current_folder"]["updated_at"],
        updatedBy: folder["current_folder"]["updated_user"],
        children : folder["elements"].map(toFile)
    }
}