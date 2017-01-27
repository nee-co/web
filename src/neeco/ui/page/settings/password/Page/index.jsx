let updatePassword = require("neeco/api/user/updatePassword")
let React          = require("react")
let LinkButton     = require("react-material/ui/view/LinkButton")
let FormButton     = require("react-material/ui/view/form/Button")
let TextField      = require("react-material/ui/view/form/TextField")
let {Link}         = require("react-router")

let classNames = require("neeco/ui/page/settings/password/Page/classNames")

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
                className={classNames.PasswordSettingsPage}
            >
                <h2>パスワードの変更</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        let formData = new FormData(e.target)

                        updatePassword({
                            apiHost    : process.env.NEECO_API_HOST,
                            token      : token,
                            password   : formData.getAll("password"),
                            newPassword: formData.getAll("newPassword")
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
                        <LinkButton
                            to="/settings"
                        >
                            キャンセル
                        </LinkButton>
                        <FormButton>
                            変更
                        </FormButton>
                    </div>
                </form>
            </section>
        )
    }
}
