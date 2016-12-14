var toFormData = require("neeco/encoding/toFormData")

module.exports = ({
    apiHost,
    userName,
    password
}) =>
    fetch(apiHost + "/token", {
        method: "POST",
        body  : toFormData({
            number  : userName,
            password: password
        })
    })
    .then(response => response.json())
    .then(x => Promise.resolve(x.token))
