let toFormData = require("neeco-client/encoding/toFormData")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    user,
}) => {
    let baseURl = user.id === undefined ? apiHost + "/user"
                :                         apiHost + "/users/" + id

    if (password !== undefined) {
        let response = await fetch(
            baseURl + "/password",
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body   : toURIQuery({
                    "current_password": user.currentPassword,
                    "new_password"    : user.password
                })
            }
        )

        if (! response.ok)
            throw response
    }

    if (image !== undefined) {
        let response = await fetch(
            baseURl + "/image",
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body   : toFormData({
                    "image": image
                })
            }
        )

        if (! response.ok)
            throw response
    }

    if (note !== undefined) {
        let response = await fetch(
            baseURl + "/note",
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body   : toFormData({
                    "note": note
                })
            }
        )

        if (! response.ok)
            throw response
    }

    return
}
