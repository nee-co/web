let updateUser = require("neeco-client/api/user/updateUser")
let config     = require("neeco-client/config")
let React      = require("react")
let Button     = require("react-material/ui/view/Button")
let TextField  = require("react-material/ui/view/form/TextField")
let {Link}     = require("react-router")

let classNames = require("neeco-client/ui/view/settings/PasswordSettingsPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        let {
            token,
            user
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <h2>パスワードの変更</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        updatePassword({
                            apiHost: config["neeco_api_host"],
                            token  : token,
                            user   : { 
                                password       : document.getElementsByName("newPassword")[0].value,
                                currentPassword: document.getElementsByName("password")[0].value
                            }
                        })
                    }}
                >
                    <TextField
                        labelText={"現在のパスワード"}
                        name="password"
                        required
                        type="password"
                    />
                    <TextField
                        labelText={"新しいパスワード"}
                        name="password"
                        required
                        type="password"
                    />
                    <TextField
                        labelText={"パスワードの再入力"}
                        name="password"
                        required
                        type="password"
                    />
                    <div
                        className={classNames.Buttons}
                    >
                        <Button
                            component={Link}
                            to="/settings"
                        >
                            キャンセル
                        </Button>
                        <Button
                            component="button"
                        >
                            変更
                        </Button>
                    </div>
                </form>
            </section>
        )
    }
}
