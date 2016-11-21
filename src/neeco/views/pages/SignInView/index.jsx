import classNames from "neeco/views/pages/SignInView/classNames"
import React      from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        var {
            onSubmit
        } = this.props

        return (
            <div className={classNames.SignInView}>
              <h2>サインイン</h2>
              <form
                onSubmit={(e) => {
                    e.preventDefault()

                    var form = e.target

                    onSubmit({
                        userName    : form.id.value,
                        password    : form.password.value,
                        staySignedIn: form.staySignedIn.checked
                    })
                }}
              >
                <label>
                  <input
                    name="id"
                    type="text"
                    placeholder="学籍番号"
                  />
                </label>
                <label>
                  <input
                    name="password"
                    type="password"
                    placeholder="パスワード"
                  />
                </label>
                <label>
                  <input
                    name="staySignedIn"
                    type="checkbox"
                    value="dummy"
                  />
                  Stay signed in
                </label>
                <button className={classNames.button}>
                  送信
                </button>
              </form>
            </div>
        )
    }
}
