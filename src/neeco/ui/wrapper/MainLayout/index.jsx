var Shadow        = require("neeco/ui/effect/Shadow")
var Footer        = require("neeco/ui/view/Footer")
var Header        = require("neeco/ui/view/Header")
var NavigationBar = require("neeco/ui/view/navigation/NavigationBar")
var classNames    = require("neeco/ui/wrapper/MainLayout/classNames")
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
            user,
            ... props
        } = this.props

        return (
            <div
                className={classNames.MainLayout}
            >
                <Header
                    notifications={this.state.notifications}
                    onToggle={() => {
                        this.setState({
                            navigationBarIsVisible: !this.state.navigationBarIsVisible
                        })
                    }}
                    user={user}
                />
                <div
                    className={classNames.Contents}
                >
                    <Shadow>
                        <NavigationBar
                            className={
                                this.state.navigationBarIsVisible ? classNames.ShowNavigationBar
                              :                                     classNames.HideNavigationBar
                            }
                            location={location}
                            onSignOut={onSignOut}
                            user={user}
                        />
                    </Shadow>
                    <main
                        children={React.cloneElement(children, {
                            location,
                            user,
                            ...props
                        })}
                        className={classNames.Main}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}
