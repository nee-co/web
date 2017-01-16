let updatePassword = require("neeco/api/user/updatePassword")
let LinkButton     = require("neeco/ui/view/LinkButton")
let FormButton     = require("neeco/ui/view/form/Button")
let TextField      = require("neeco/ui/view/form/TextField")
let classNames     = require("neeco/ui/page/settings/password/Page/classNames")
let React          = require("react")
let {Link}         = require("react-router")

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
