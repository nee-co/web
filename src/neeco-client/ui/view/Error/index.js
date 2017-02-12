let config = require("neeco-client/config")
let React  = require("react")

module.exports = ({
    component = "span",
    Component = component,
    error
}) =>
    <Component>
        {(() => {
            if (error instanceof DOMException) {
                switch (error.code) {
                    case DOMException.NETWORK_ERR: return "ネットワークエラーが発生しました。"
                }
            } else if (error instanceof Response) {
                switch (error.status) {
                    case 500: return "サーバーエラーが発生しました。"
                    case 404: switch (error.url) {
                        case config["neeco_api_host"] + "/token": return "学籍番号またはパスワードが間違っています。"
                    }
                }
            }

            return "不明なエラーが発生しました。"
        })()}
    </Component>
