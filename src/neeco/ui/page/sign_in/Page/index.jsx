var createToken = require("neeco/api/auth/createToken")
var classNames  = require("neeco/ui/page/sign_in/Page/classNames")
var FormButton  = require("neeco/ui/view/form/Button")
var Input       = require("neeco/ui/view/form/Input")
var React       = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        var {
            onSignIn
        } = this.props

        return (
            <section
                className={classNames.SignInPage}
            >
                <h2>Sign in to NEE-CO</h2>
                <div className={classNames.SignInCard}>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()

                            var formData = new FormData(e.target)

                            try {
                                var token = await createToken({
                                    apiHost : process.env.NEECO_API_HOST,
                                    userName: formData.getAll("id"),
                                    password: formData.getAll("password")
                                })

                                onSignIn({
                                    token       : token,
                                    staySignedIn: formData.getAll("staySignedIn")
                                })
                            } catch (e) {
                                var error = e instanceof Response ? "学籍番号またはパスワードが間違っています"
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
                        <FormButton>
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
