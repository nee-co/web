let updateUser         = require("neeco-client/api/user/updateUser")
let apply              = require("neeco-client/apply")
let config             = require("neeco-client/config")
let React              = require("react")
let Button             = require("react-material/ui/view/Button")
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel")
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList")
let LinearLayout       = require("react-material/ui/view/LinearLayout")
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace")
let TextField          = require("react-material/ui/view/form/TextField")
let {Link}             = require("react-router")

let classNames = require("neeco-client/ui/view/settings/SettingsPage/classNames")

let onInput = e => {
    let form = e.target.form

    let password = form.elements["password"].value
    let confirmPasswordInput = form.elements["confirm_password"]

    if (confirmPasswordInput.value == password)
        confirmPasswordInput.setCustomValidity("")
    else
        confirmPasswordInput.setCustomValidity("再入力されたパスワードが一致しません。")
}

let Buttons = x =>
    <LinearLayout
        orientation="horizontal"
        {...x}
    >
        <FlexibleSpace />
        <Button>
            キャンセル
        </Button>
        <Button
            component="button"
        >
            完了
        </Button>
    </LinearLayout>

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
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
                <ExpansionPanelList>
                    <ExpansionPanel
                        disabled
                        labelText="学籍番号"
                        defaultValue={apply(store, "user").number}
                    />
                    <ExpansionPanel
                        disabled
                        labelText="氏名"
                        defaultValue={apply(store, "user").name}
                    />
                    <ExpansionPanel
                        labelText="画像"
                    >
                        <div
                            className={classNames.UserImage}
                            style={{
                                backgroundImage: "url(" + apply(store, "user").image + ")"
                            }}
                        />
                        <Buttons />
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="自己紹介"
                        defaultValue={apply(store, "user").note}
                    >
                        <form
                            onSubmit={e => {
                                e.preventDefault()

                                updateUser({

                                    token: token
                                })
                            }}
                        >
                            <textarea
                                name="note"
                                cols="30"
                                rows="10"
                            />
                        </form>
                        <Buttons />
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="パスワード"
                    >
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault()

                                let form = e.target

                                try {
                                    await updateUser({
                                        apiHost: config["neeco_api_host"],
                                        token  : apply(store, "token"),
                                        user   : {
                                            password       : form.elements["password"].value,
                                            currentPassword: form.elements["current_password"].value
                                        }
                                    })

                                    this.setState({
                                        passwordEditDialogIsVisible: false
                                    })
                                } catch(e) {
                                    onError(e)
                                }
                            }}
                        >
                            <TextField
                                labelText={"現在のパスワード"}
                                name="current_password"
                                required
                                type="password"
                            />
                            <TextField
                                labelText={"新しいパスワード"}
                                name="password"
                                onInput={onInput}
                                required
                                type="password"
                            />
                            <TextField
                                labelText={"パスワードの再入力"}
                                name="confirm_password"
                                onInput={onInput}
                                required
                                type="password"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                </ExpansionPanelList>
            </section>
        )
    }
}
