import me             from "neeco/api/me"
import updatePassword from "neeco/api/settings/updatePassword"
import style          from "neeco/views/SettingsView/style"
import MainContainer  from "neeco/views/common/MainContainer"
import React          from "react"

export default class extends React.Component {
    componentWillMount() {
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        me({token: this.props.token})
            .then((user) => this.setState({user: user}))
            .catch((e) => {
            })
    }

    render() {
        var {user} = this.state

        return (
            <MainContainer {... this.props}>
              <section className={style.SettingsView}>
                <h2>設定</h2>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    var form = e.target

                    updatePassword({
                        token      : this.props.token,
                        password   : form.password.value,
                        newPassword: form.newPassword.value
                    })
                }}>
                  <label>
                    現在のパスワード
                    <input type="password" required name="password" />
                  </label>
                  <label>
                    新しいパスワード
                    <input type="password" required name="newPassword"/>
                  </label>
                  <label>
                    新しいパスワードを再入力
                    <input type="password" required name="newPasswordConfirmation"/>
                  </label>
                  <button>パスワードを変更</button>
                </form>
              </section>
            </MainContainer>
        )
    }
}
