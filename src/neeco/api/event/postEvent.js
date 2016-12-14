var toFormData   = require("neeco/encoding/toFormData")

module.exports = ({
    apiHost,
    token,
    title,
    startDate,
    description,
    image
}) =>
    fetch(apiHost + "/events", {
        method : "POST",
        headers: {
            authorization: "Bearer " + token
        },
        body   : toFormData({
            title     : title,
            start_date: startDate,
            body      : description,
            image     : image
        })
    })
    .then(response => response.ok)
