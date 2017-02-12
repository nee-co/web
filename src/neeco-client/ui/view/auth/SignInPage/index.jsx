let createToken = require("neeco-client/api/auth/createToken")
let config      = require("neeco-client/config")
let Error       = require("neeco-client/ui/view/Error")
let React       = require("react")
let Button      = require("react-material/ui/view/Button")
let Snackbar    = require("react-material/ui/view/Snackbar")
let TextField   = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/auth/SignInPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            errors: []
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
                        onSubmit={async e => {
                            e.preventDefault()

                            let form = e.target

                            try {
                                let token = await createToken({
                                    apiHost : config["neeco_api_host"],
                                    userName: form.elements["id"].value,
                                    password: form.elements["password"].value
                                })

                                onSignIn({
                                    token       : token,
                                    staySignedIn: form.elements["staySignedIn"].checked
                                })
                            } catch (e) {
                                this.setState({
                                    errors: this.state.errors.concat({
                                        error: e,
                                        key  : Date.now()
                                    })
                                })
                            }
                        }}
                    >
                        <TextField
                            name="id"
                            placeholder="学籍番号"
                            required
                            type="text"
                        />
                        <TextField
                            name="password"
                            placeholder="パスワード"
                            required
                            type="password"
                        />
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
                </div>
                {this.state.errors.map(x =>
                    <Snackbar
                        key={x.key}
                        duration={3000}
                        onHidden={() => {
                            this.setState({
                                errors: this.state.errors.filter(y => y != x)
                            })
                        }}
                    >
                        <Error
                            error={x.error}
                        />
                    </Snackbar>
                )}
            </section>
        )
    }
}
