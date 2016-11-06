import me            from "neeco/api/me"
import Footer        from "neeco/views/common/Footer"
import Header        from "neeco/views/common/Header"
import style         from "neeco/views/common/MainContainer/style"
import NavigationBar from "neeco/views/common/NavigationBar"
import React         from "react"

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navigationBarIsVisible: true,
            notifications: []
        }
    }

    componentWillMount() {
        me(this.props.token)
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

        return (
            <div className={style.MainContainer}>
              <Header
                notifications={notifications}
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
