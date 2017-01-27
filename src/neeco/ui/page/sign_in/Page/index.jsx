let createToken = require("neeco/api/auth/createToken")
let React       = require("react")
let FormButton  = require("react-material/ui/view/form/Button")
let Input       = require("react-material/ui/view/form/Input")

let classNames = require("neeco/ui/page/sign_in/Page/classNames")

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
                className={classNames.SignInPage}
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
                                    apiHost : process.env.NEECO_API_HOST,
                                    userName: formData.getAll("id"),
                                    password: formData.getAll("password")
                                })

                                onSignIn({
                                    token       : token,
                                    staySignedIn: formData.getAll("staySignedIn")
                                })
                            } catch (e) {
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
                        <FormButton
                            type="raised"
                        >
                            サインイン
                        </FormButton>
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
