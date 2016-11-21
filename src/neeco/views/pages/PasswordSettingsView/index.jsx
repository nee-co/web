import updatePassword from "neeco/api/user/updatePassword"
import classNames     from "neeco/views/pages/PasswordSettingsView/classNames"
import FormButton     from "neeco/views/parts/FormButton"
import MainContainer  from "neeco/views/parts/MainContainer"
import React          from "react"
import {Link}         from "react-router"

export default class extends React.Component {
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
