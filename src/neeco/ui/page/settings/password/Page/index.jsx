var updatePassword = require("neeco/api/user/updatePassword")
var LinkButton     = require("neeco/ui/view/LinkButton")
var FormButton     = require("neeco/ui/view/form/Button")
var Input          = require("neeco/ui/view/form/Input")
var classNames     = require("neeco/ui/page/settings/password/Page/classNames")
var React          = require("react")
var {Link}         = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        var {
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

                        var formData = new FormData(e.target)

                        updatePassword({
                            apiHost    : process.env.NEECO_API_HOST,
                            token      : token,
                            password   : formData.getAll("password"),
                            newPassword: formData.getAll("newPassword")
                        })
                    }}
                >
                    <label>
                        現在のパスワード<br />
                        <Input
                            name="password"
                            required
                            type="password"
                        />
                    </label>
                    <label>
                        新しいパスワード<br />
                        <Input
                            name="newPassword"
                            required
                            type="password"
                        />
                    </label>
                    <label>
                        パスワードの再入力<br />
                        <Input
                            name="newPasswordConfirmation"
                            required
                            type="password"
                        />
                    </label>
                    <div>
                        <FormButton>変更</FormButton>
                        <LinkButton
                            className={classNames.CancelButton}
                            to="/settings"
                        >
                            キャンセル
                        </LinkButton>
                    </div>
                </form>
            </section>
        )
    }
}
