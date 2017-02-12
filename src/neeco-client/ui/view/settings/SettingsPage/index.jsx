let updateUser         = require("neeco-client/api/user/updateUser")
let apply              = require("neeco-client/apply")
let config             = require("neeco-client/config")
let PasswordEditDialog = require("neeco-client/ui/view/settings/PasswordEditDialog")
let React              = require("react")
let Button             = require("react-material/ui/view/Button")
let TextField          = require("react-material/ui/view/form/TextField")
let {Link}             = require("react-router")

let classNames = require("neeco-client/ui/view/settings/SettingsPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: undefined,
            passwordEditDialogIsVisible: false
        })
    }

    render() {
        let {
            onError,
            store
        } = this.props

        return (
            <section
                className={classNames.Host}
            >
                <div
                    className={classNames.UserImage}
                    style={{
                        backgroundImage: "url(" + apply(store, "user").image + ")"
                    }}
                />
                <form
                    onSubmit={e => {
                        e.preventDefault()

                    }}
                >
                    <TextField
                        disabled
                        labelText="学籍番号"
                        name="number"
                        defaultValue={apply(store, "user").number}
                    />
                    <TextField
                        disabled
                        labelText="氏名"
                        name="name"
                        defaultValue={apply(store, "user").name}
                    />
                    <TextField
                        labelText="自己紹介"
                        name="note"
                        defaultValue={apply(store, "user").note}
                        multiLine
                    />
                </form>
                <Button
                    onClick={e => {
                        this.setState({
                            passwordEditDialogIsVisible: true
                        })
                    }}
                >
                    パスワードの変更
                </Button>
                <PasswordEditDialog
                    onCancel={() => {
                        this.setState({
                            passwordEditDialogIsVisible: false
                        })
                    }}
                    onDone={async ({password, currentPassword}) => {
                        try {
                            await updateUser({
                                apiHost: config["neeco_api_host"],
                                token  : apply(store, "token"),
                                user   : {
                                    password       : password,
                                    currentPassword: currentPassword
                                }
                            })

                            this.setState({
                                passwordEditDialogIsVisible: false
                            })
                        } catch(e) {
                            onError(e)
                        }
                    }}
                    visible={this.state.passwordEditDialogIsVisible}
                />
            </section>
        )
    }
}
