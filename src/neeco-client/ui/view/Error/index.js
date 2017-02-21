let config = require("neeco-client/config")
let React  = require("react")

let unknownError = "不明なエラーが発生しました。"

module.exports = ({
    component = "span",
    Component = component,
    error
}) =>
    <Component>
        {(
            error instanceof DOMException ? (
                error.code == DOMException.NETWORK_ERR ? "ネットワークエラーが発生しました。"
              :                                          unknownError
            )
          : error instanceof Response     ? (
                error.status >= 500 ? "サーバーエラーが発生しました。"
              : error.status == 404 ? (
                    error.url == config["neeco_api_host"] + "/token" ? "学籍番号またはパスワードが間違っています。"
                  :                                                    unknownError
                )
              : error.status == 403 ? "リソースへのアクセス権がありません。"
              :                       unknownError
            )
          :                                 unknownError
        )}
    </Component>
