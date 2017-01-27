let React      = require("react")
let LinkButton = require("react-material/ui/view/LinkButton")
let TextArea   = require("react-material/ui/view/form/TextArea")

let classNames = require("neeco/ui/page/settings/Page/classNames")

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
                <div>
                    <LinkButton
                        to="/settings/password"
                    >
                        パスワードの変更
                    </LinkButton>
                </div>
            </section>
        )
    }
}
