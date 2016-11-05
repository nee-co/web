import Footer        from "neeco/views/common/Footer"
import Header        from "neeco/views/common/Header"
import style         from "neeco/views/common/MainContainer/style"
import NavigationBar from "neeco/views/common/NavigationBar"
import React         from "react"

export default class extends React.Component {
    componentWillMount() {
        this.state = {
            navigationBarIsVisible: true,
            notifications: []
        }
    }

    render() {
        var {user} = this.props
        var {navigationBarIsVisible, notifications} = this.state

        return (
            <div className={style.MainContainer}>
              <Header
                notifications={notifications}
                onToggle={() => this.setState({ navigationBarIsVisible: !navigationBarIsVisible })}
              />
              <div className={style.Content}>
                <NavigationBar
                    className={
                        navigationBarIsVisible ? style.ShowNavigationBar
                                               : style.HideNavigationBar
                    }
                    location={this.props.location}
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
