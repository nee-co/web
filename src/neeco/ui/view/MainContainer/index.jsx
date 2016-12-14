var Footer        = require("neeco/ui/view/Footer")
var Header        = require("neeco/ui/view/Header")
var classNames    = require("neeco/ui/view/MainContainer/classNames")
var NavigationBar = require("neeco/ui/view/NavigationBar")
var React         = require("react")

module.exports = class extends React.Component {
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
            <div
                className={classNames.MainContainer}
            >
                <Header
                    notifications={this.state.notifications}
                    onToggle={() => this.setState({
                        navigationBarIsVisible: !this.state.navigationBarIsVisible
                    })}
                    user={user}
                />
                <div
                    className={classNames.Contents}
                >
                    <NavigationBar
                        className={
                            this.state.navigationBarIsVisible ? classNames.ShowNavigationBar
                                                              : classNames.HideNavigationBar
                        }
                        location={location}
                        onSignOut={onSignOut}
                        user={user}
                    />
                    <main
                        className={classNames.Main}
                    >
                        {children}
                    </main>
                </div>
                <Footer />
            </div>
        )
    }
}
