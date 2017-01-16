let Toolbar          = require("neeco/ui/view/Toolbar")
let NavigationDrawer = require("neeco/ui/view/NavigationDrawer")
let classNames       = require("neeco/ui/wrapper/MainLayout/classNames")
let React            = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            drawerIsVisible: true,
            notifications         : []
        })
    }

    render() {
        let {
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
                <Toolbar
                    notifications={this.state.notifications}
                    onToggle={() => {
                        this.setState({
                            drawerIsVisible: !this.state.drawerIsVisible
                        })
                    }}
                    user={user}
                />
                <div
                    className={classNames.Contents}
                >
                    <NavigationDrawer
                        className={
                            this.state.drawerIsVisible ? classNames.ShowNavigationBar
                          :                              classNames.HideNavigationBar
                        }
                        location={location}
                        onSignOut={onSignOut}
                        user={user}
                    />
                    <main
                        children={React.cloneElement(children, {
                            location,
                            user,
                            ...props
                        })}
                        className={classNames.Main}
                    />
                </div>
            </div>
        )
    }
}
