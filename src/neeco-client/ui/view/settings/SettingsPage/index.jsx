let UpdateUser         = require("neeco-client/api/request/UpdateUser")
let Editor             = require("neeco-client/ui/view/Editor")
let React              = require("react")
let Button             = require("react-material/ui/view/Button")
let ExpansionPanel     = require("react-material/ui/view/ExpansionPanel")
let ExpansionPanelList = require("react-material/ui/view/ExpansionPanelList")
let LinearLayout       = require("react-material/ui/view/LinearLayout")
let FlexibleSpace      = require("react-material/ui/view/FlexibleSpace")
let ImageInput         = require("react-material/ui/view/form/ImageInput")
let TextField          = require("react-material/ui/view/form/TextField")

let classNames = require("neeco-client/ui/view/settings/SettingsPage/classNames")

let onPasswordInput = e => {
    let form = e.target.form

    let password = form.elements["password"].value
    let confirmPasswordInput = form.elements["confirm_password"]

    if (confirmPasswordInput.value == password)
        confirmPasswordInput.setCustomValidity("")
    else
        confirmPasswordInput.setCustomValidity("再入力されたパスワードが一致しません。")
}

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex: undefined
        })
    }

    render() {
        let {
            onUserUpdate,
            client,
            user
        } = this.props

        let Buttons = x =>
            <LinearLayout
                orientation="horizontal"
                {...x}
            >
                <FlexibleSpace />
                <Button
                    onClick={e => this.setState({
                        selectedIndex: undefined
                    })}
                >
                    取消
                </Button>
                <Button
                    component="button"
                >
                    保存
                </Button>
            </LinearLayout>

        return (
            <div
                className={classNames.Host}
            >
                <ExpansionPanelList
                    onSelected={({index}) => this.setState({
                        selectedIndex: index
                    })}
                    onUnselected={({index}) => this.setState({
                        selectedIndex: undefined
                    })}
                    selectedIndexes={
                        this.state.selectedIndex == undefined ? []
                      :                                         [this.state.selectedIndex]
                    }
                >
                    <ExpansionPanel
                        disabled
                        labelText="学籍番号"
                        value={user && user.number}
                    />
                    <ExpansionPanel
                        disabled
                        labelText="氏名"
                        value={user && user.name}
                    />
                    <ExpansionPanel
                        hintText="画像の更新が適用されるまで数分程かかります。"
                        labelText="画像"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onUserUpdate(await client(UpdateUser({
                                    user: {
                                        image: form.elements["image"].files
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <ImageInput
                                defaultImageUrl={user && user.image}
                                name="image"
                                width="128"
                                height="128"
                                onBlur={e => {
                                    if (
                                        e.target.files.length
                                     && !/\.[a-z]+$/.test(e.target.files[0].name)
                                    )
                                        e.target.setCustomValidity("画像の拡張子は小文字のみを受け付けます")
                                    else
                                        e.target.setCustomValidity("")
                                }}
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="プロフィール"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onUserUpdate(await client(UpdateUser({
                                    user: {
                                        note: form.elements["note"].value
                                    }
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
                            }}
                        >
                            <Editor
                                defaultValue={user && user.note}
                                name="note"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                    <ExpansionPanel
                        labelText="パスワード"
                    >
                        <form
                            onSubmit={async e => {
                                e.preventDefault()

                                let form = e.target

                                onUserUpdate(await client(UpdateUser({
                                    password       : form.elements["password"].value,
                                    currentPassword: form.elements["current_password"].value
                                })))

                                this.setState({
                                    selectedIndex: undefined
                                })
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
                                onInput={onPasswordInput}
                                required
                                type="password"
                            />
                            <TextField
                                labelText={"パスワードの再入力"}
                                name="confirm_password"
                                onInput={onPasswordInput}
                                required
                                type="password"
                            />
                            <Buttons />
                        </form>
                    </ExpansionPanel>
                </ExpansionPanelList>
            </div>
        )
    }
}
