var updatePassword = require("neeco/api/user/updatePassword")
var classNames     = require("neeco/ui/page/PasswordSettingsPage/classNames")
var FormButton     = require("neeco/ui/view/FormButton")
var FormInput      = require("neeco/ui/view/FormInput")
var MainContainer  = require("neeco/ui/view/MainContainer")
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
            <MainContainer
                {... this.props}
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
                            <FormInput
                                name="password"
                                required
                                type="password"
                            />
                        </label>
                        <label>
                            新しいパスワード<br />
                            <FormInput
                                name="newPassword"
                                required
                                type="password"
                            />
                        </label>
                        <label>
                            パスワードの再入力<br />
                            <FormInput
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
            </MainContainer>
        )
    }
}
