import "whatwg-fetch"

var uri = "https://api.neec.ooo" + "/users";

export default (token) =>
    fetch(uri, {
        method : "GET",
        headers: new Headers({
            authorization: "Bearer " + token
        })
    })
    .then(response => response.json())
    .then(user => Promise.resolve({
        id     : user.user_id,
        number : user.number,
        name   : user.name,
        image  : user.image_path,
        college: user.college
    }))
