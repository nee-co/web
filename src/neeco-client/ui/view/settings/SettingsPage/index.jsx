let React    = require("react")
let Button   = require("react-material/ui/view/Button")
let TextArea = require("react-material/ui/view/form/TextArea")
let {Link}   = require("react-router")

let classNames = require("neeco-client/ui/view/settings/SettingsPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            error: null
        })
    }

    render() {
        let {
            token,
            user
        } = this.props

        return (
            <section
                className={classNames.Host}
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
                <div>
                    <Button
                        component={Link}
                        to="/settings/password"
                    >
                        パスワードの変更
                    </Button>
                </div>
            </section>
        )
    }
}
