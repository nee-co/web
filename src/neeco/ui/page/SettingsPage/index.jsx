var classNames    = require("neeco/ui/page/SettingsPage/classNames")
var FormTextArea  = require("neeco/ui/view/FormTextArea")
var Link          = require("neeco/ui/view/Link")
var MainContainer = require("neeco/ui/view/MainContainer")
var React         = require("react")

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
                    className={classNames.SettingsPage}
                >
                    <h2>設定</h2>
                    <div
                        className={classNames.UserImage}
                        style={{
                            backgroundImage: user ? "url(" + user.image + ")" : undefined
                        }}
                    />
                    <form>
                    </form>
                    <dl>
                        <dt>学籍番号</dt>
                        <dd>{user ? user.number : ""}</dd>
                        <br />
                        <dt>氏名</dt>
                        <dd>{user ? user.name : ""}</dd>
                        <br />
                        <dt>自己紹介</dt>
                        <dd>
                            {user ? user.note : ""}
                            <form
                                style={{
                                    display: "none"
                                }}
                            >
                                <FormTextArea
                                    defaultValue={user ? user.note : ""}
                                />
                            </form>
                        </dd>
                    </dl>
                    <br />
                    <Link
                        to="/settings/password"
                    >
                        パスワードの変更
                    </Link>
                </section>
            </MainContainer>
        )
    }
}
