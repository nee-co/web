var classNames = require("neeco/ui/page/settings/Page/classNames")
var TextArea   = require("neeco/ui/view/form/TextArea")
var Link       = require("neeco/ui/view/Link")
var React      = require("react")

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
                className={classNames.SettingsPage}
            >
                <h2>設定</h2>
                <div
                    className={classNames.UserImage}
                    style={{
                        backgroundImage: user && "url(" + user.image + ")"
                    }}
                />
                <form>
                </form>
                <dl>
                    <dt>学籍番号</dt>
                    <dd>{user && user.number}</dd>
                    <br />
                    <dt>氏名</dt>
                    <dd>{user && user.name}</dd>
                    <br />
                    <dt>自己紹介</dt>
                    <dd>
                        {user && user.note}
                        <form
                            style={{
                                display: "none"
                            }}
                        >
                            <TextArea
                                defaultValue={user && user.note}
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
        )
    }
}
