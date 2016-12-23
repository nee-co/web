var updatePassword = require("neeco/api/user/updatePassword")
var classNames     = require("neeco/ui/page/settings/password/Page/classNames")
var FormButton     = require("neeco/ui/view/form/Button")
var Input          = require("neeco/ui/view/form/Input")
var MainLayout     = require("neeco/ui/view/MainLayout")
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
            <MainLayout
                {...this.props}
            >
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
                            <Link
                                className={classNames.CancelButton}
                                to="/settings"
                            >
                                キャンセル
                            </Link>
                        </div>
                    </form>
                </section>
            </MainLayout>
        )
    }
}
