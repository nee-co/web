var classNames     = require("neeco/views/pages/SettingsView/classNames")
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
              <section className={classNames.SettingsView}>
                <h2>設定</h2>
                <div
                  className={classNames.UserImage}
                  style={{
                      backgroundImage: user ? "url(" + user.image + ")" : undefined
                  }}
                />
                {user ? user.number : ""}&nbsp;<br />
                {user ? user.name   : ""}&nbsp;<br />
                <Link to="/settings/password">パスワードの変更</Link>
              </section>
            </MainContainer>
        )
    }
}
