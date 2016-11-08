import me            from "neeco/api/me"
import Footer        from "neeco/views/common/Footer"
import Header        from "neeco/views/common/Header"
import style         from "neeco/views/common/MainContainer/style"
import NavigationBar from "neeco/views/common/NavigationBar"
import React         from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            navigationBarIsVisible: true,
            notifications         : [],
            user                  : null
        })
    }

    componentDidMount() {
        me({token: this.props.token})
            .then((user) => this.setState({user: user}))
            .catch((e) => {
            })
    }

    render() {
        var {
            navigationBarIsVisible,
            notifications,
            user
        } = this.state

        var {
            onSignOut
        } = this.props

        return (
            <div className={style.MainContainer}>
              <Header
                notifications={notifications}
                onSignOut={onSignOut}
                onToggle={() => this.setState({navigationBarIsVisible: !navigationBarIsVisible})}
              />
              <div className={style.Content}>
                <NavigationBar
                  className={
                      navigationBarIsVisible ? style.ShowNavigationBar
                                             : style.HideNavigationBar
                  }
                  user={user}
                />
                <main className={style.Main}>
                  {this.props.children}
                </main>
              </div>
              <Footer />
            </div>
        )
    }
}
