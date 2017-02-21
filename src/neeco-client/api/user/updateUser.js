let toUser     = require("neeco-client/api/user/toUser")
let toFormData = require("neeco-client/encoding/toFormData")
let toURIQuery = require("neeco-client/encoding/toURIQuery")

module.exports = async ({
    apiHost,
    token,
    user,
}) => {
    let baseURl = user.id === undefined ? apiHost + "/user"
                :                         apiHost + "/users/" + user.id

    if (user.password !== undefined) {
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

    if (user.image !== undefined) {
        let response = await fetch(
            baseURl + "/image",
            {
                method : "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body   : toFormData({
                    "image": user.image
                })
            }
        )

        if (! response.ok)
            throw response
    }

    if (user.note !== undefined) {
        let response = await fetch(
            baseURl + "/note",
            {
                method : "PATCH",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body   : toFormData({
                    "note": user.note
                })
            }
        )

        if (! response.ok)
            throw response
    }

    let response = await fetch(
        baseURl,
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    )

    return toUser(await response.json())
}
