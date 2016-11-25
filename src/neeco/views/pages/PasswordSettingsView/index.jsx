var updatePassword = require("neeco/api/user/updatePassword")
var classNames     = require("neeco/views/pages/PasswordSettingsView/classNames")
var FormButton     = require("neeco/views/parts/FormButton")
var MainContainer  = require("neeco/views/parts/MainContainer")
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
            <MainContainer {... this.props}>
              <section className={classNames.PasswordSettingsView}>
                <h2>パスワードの変更</h2>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    var form = e.target

                    updatePassword({
                        token      : token,
                        password   : form.password.value,
                        newPassword: form.newPassword.value
                    })
                }}>
                  <label>
                    現在のパスワード<br />
                    <input type="password" required name="password" />
                  </label>
                  <label>
                    新しいパスワード<br />
                    <input type="password" required name="newPassword"/>
                  </label>
                  <label>
                    パスワードの再入力<br />
                    <input type="password" required name="newPasswordConfirmation"/>
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
