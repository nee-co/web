import Footer         from "neeco/views/parts/Footer"
import Header         from "neeco/views/parts/Header"
import classNames     from "neeco/views/parts/MainContainer/classNames"
import NavigationBar  from "neeco/views/parts/NavigationBar"
import React          from "react"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            navigationBarIsVisible: true,
            notifications         : []
        })
    }

    render() {
        var {
            children,
            location,
            onSignOut,
            user
        } = this.props

        return (
            <div className={classNames.MainContainer}>
              <Header
                notifications={this.state.notifications}
                onToggle={() => this.setState({
                    navigationBarIsVisible: !this.state.navigationBarIsVisible
                })}
                user={user}
              />
              <div className={classNames.Contents}>
                <NavigationBar
                  className={
                      this.state.navigationBarIsVisible ? classNames.ShowNavigationBar
                                                        : classNames.HideNavigationBar
                  }
                  location={location}
                  onSignOut={onSignOut}
                  user={user}
                />
                <main className={classNames.Main}>{
                    children
                }</main>
              </div>
              <Footer />
            </div>
        )
    }
}
