let Router   = require("neeco-client/ui/Router")
let React    = require("react")
let {render} = require("react-dom")

render(<Router />, document.querySelector(".root"))

;(async () => {
    try {
        let registration = await navigator.serviceWorker.register(
            "/ServiceWorker.js"
        )

        console.log("ServiceWorker registration successful with scope: ", registration.scope)
    } catch (e) {
        console.log("ServiceWorker registration failed: ", e)
    }
})()
