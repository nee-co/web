let createToken = require("neeco-client/api/auth/createToken")
let config      = require("neeco-client/config")
let React       = require("react")
let Button      = require("react-material/ui/view/Button")
let Input       = require("react-material/ui/view/form/Input")

let classNames = require("neeco-client/ui/view/auth/SignInPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        let {
            onSignIn
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <h2>Sign in to NEE-CO</h2>
                <div
                    className={classNames.SignInCard}
                >
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()

                            let formData = new FormData(e.target)

                            try {
                                let token = await createToken({
                                    apiHost : config["neeco_api_host"],
                                    userName: formData.getAll("id"),
                                    password: formData.getAll("password")
                                })

                                onSignIn({
                                    token       : token,
                                    staySignedIn: formData.getAll("staySignedIn")
                                })
                            } catch (e) {
                                console.log(e)

                                let error = e instanceof Response ? "学籍番号またはパスワードが間違っています"
                                          :                         "不明なエラー"

                                this.setState({
                                    error: error
                                })
                            }
                        }}
                    >
                        <label>
                            <Input
                                name="id"
                                placeholder="学籍番号"
                                required
                                type="text"
                            />
                        </label>
                        <label>
                            <Input
                                name="password"
                                placeholder="パスワード"
                                required
                                type="password"
                            />
                        </label>
                        <label>
                            <input
                                name="staySignedIn"
                                type="checkbox"
                                value="dummy"
                            />
                            <span
                                className={classNames.SmallText}
                            >
                                サインイン状態を保持する
                            </span>
                        </label>
                        <Button
                            component="button"
                            type="raised"
                        >
                            サインイン
                        </Button>
                    </form>
                    <p
                        className={classNames.Error}
                    >
                        {this.state.error}
                    </p>
                </div>
            </section>
        )
    }
}
