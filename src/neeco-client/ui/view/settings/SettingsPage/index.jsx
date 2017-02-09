let updateUser         = require("neeco-client/api/user/updateUser")
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
            error: null,
            passwordEditDialogIsVisible: false
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
                <div
                    className={classNames.UserImage}
                    style={{
                        backgroundImage: user && "url(" + user.image + ")"
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
                        defaultValue={user && user.number}
                    />
                    <TextField
                        disabled
                        labelText="氏名"
                        name="name"
                        defaultValue={user && user.name}
                    />
                    <TextField
                        labelText="自己紹介"
                        name="note"
                        defaultValue={user && user.note}
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
                                token  : token,
                                user   : { 
                                    password       : password,
                                    currentPassword: currentPassword
                                }
                            })

                            this.setState({
                                passwordEditDialogIsVisible: false
                            })
                        } catch(e) {
                            console.log(e)
                        }
                    }}
                    visible={this.state.passwordEditDialogIsVisible}
                />
            </section>
        )
    }
}
