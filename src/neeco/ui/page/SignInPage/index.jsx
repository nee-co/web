var classNames = require("neeco/ui/page/SignInPage/classNames")
var FormButton = require("neeco/ui/view/FormButton")
var FormInput  = require("neeco/ui/view/FormInput")
var React      = require("react")

module.exports = class extends React.Component {
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
            <div
                className={classNames.SignInPage}
            >
                <h2>サインイン</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        var formData = new FormData(e.target)

                        onSubmit({
                            userName    : formData.getAll("id"),
                            password    : formData.getAll("password"),
                            staySignedIn: formData.getAll("staySignedIn")
                        })
                    }}
                >
                    <label>
                        <FormInput
                            name="id"
                            placeholder="学籍番号"
                            type="text"
                        />
                    </label>
                    <label>
                        <FormInput
                            name="password"
                            placeholder="パスワード"
                            type="password"
                        />
                    </label>
                    <label>
                        <input
                            name="staySignedIn"
                            type="checkbox"
                            value="dummy"
                        />
                        保存する
                    </label>
                    <FormButton>
                        送信
                    </FormButton>
                </form>
            </div>
        )
    }
}
