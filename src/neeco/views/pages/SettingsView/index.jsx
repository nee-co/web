import classNames     from "neeco/views/pages/SettingsView/classNames"
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
