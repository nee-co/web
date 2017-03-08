let CreateToken = require("neeco-client/api/request/CreateToken")
let React       = require("react")
let Button      = require("react-material/ui/view/Button")
let TextField   = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/auth/SignInPage/classNames")

module.exports = class extends React.Component {
    render() {
        let {
            client,
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

                            onSignIn({
                                staySignedIn: form.elements["staySignedIn"].checked,
                                token       : await client(CreateToken({
                                    userName: form.elements["id"].value,
                                    password: form.elements["password"].value
                                }))
                            })
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
            </section>
        )
    }
}
