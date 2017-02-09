let FontAwesomeIcon  = require("neeco-client/ui/view/FontAwesomeIcon")
let Logo             = require("neeco-client/ui/view/Logo")
let React            = require("react")
let Ripple           = require("react-material/ui/effect/Ripple")
let Button           = require("react-material/ui/view/Button")
let Divider          = require("react-material/ui/view/Divider")
let FlexibleSpace    = require("react-material/ui/view/FlexibleSpace")
let List             = require("react-material/ui/view/List")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let NavigationDrawer = require("react-material/ui/view/NavigationDrawer")
let Toolbar          = require("react-material/ui/view/Toolbar")
let ToolbarTitle     = require("react-material/ui/view/ToolbarTitle")

let classNames = require("neeco-client/ui/wrapper/MainLayout/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            drawerIsVisible: true,
            notifications  : []
        })
    }

    render() {
        let {
            children,
            location,
            main,
            onSignOut,
            title,
            user,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <Toolbar>
                    <Ripple
                        children={"\uF0C9"}
                        className={classNames.Toggle}
                        component={FontAwesomeIcon}
                        fixed
                        onClick={() => {
                            this.setState({
                                drawerIsVisible: !this.state.drawerIsVisible
                            })
                        }}
                    />
                    <ToolbarTitle
                        className={classNames.Title}
                        component="h1"
                    >
                        <Logo
                            className={classNames.Logo}
                        />
                        {
                            [
                                ["/",                  ""],
                                ["/events",            "イベント"],
                                ["/folders",           "ドライブ"],
                                ["/groups",            "グループ"],
                                ["/settings",          "設定"],
                                ["/settings/password", "パスワード設定"]
                            ]
                                .sort((x, y) => x[0] < y[0])
                                .find(x => new RegExp("^" + x[0]).test(location.pathname))
                                [1]
                        }
                    </ToolbarTitle>
                    <FlexibleSpace />
                    <Button
                        onClick={onSignOut}
                    >
                        {"サインアウト"}
                    </Button>
                </Toolbar>
                <div
                    className={classNames.Contents}
                >
                    <NavigationDrawer
                        className={classNames.Sidebar}
                        elevation={0}
                        visible={
                          (
                              typeof window == "undefined" ? this.state.drawerIsVisible
                            : window.innerWidth < 640      ? !this.state.drawerIsVisible
                            :                                this.state.drawerIsVisible
                          )
                        }
                        onClick={e => {
                            if (window.innerWidth < 640)
                                this.setState({
                                    drawerIsVisible: true
                                })
                        }}
                    >
                        <List
                            location={location}
                        >
                            <ListItem>
                                <ListItemIcon
                                    src={user && user.image}
                                />
                                <ListItemTextArea>
                                    {user && user.number}
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/"
                            >
                                <ListItemIcon
                                    children={"\uF0E4"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    ホーム
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/events"
                            >
                                <ListItemIcon
                                    children={"\uF073"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    イベント
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/groups"
                            >
                                <ListItemIcon
                                    children={"\uF0C0"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    グループ
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/folders"
                            >
                                <ListItemIcon
                                    children={"\uF0A0"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    ドライブ
                                </ListItemTextArea>
                            </ListItem>
                            <Divider />
                            <ListItem
                                to="/settings"
                            >
                                <ListItemIcon
                                    children={"\uF007"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    設定
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon
                                    children={"\uF128"}
                                    component={FontAwesomeIcon}
                                />
                                <ListItemTextArea>
                                    ヘルプとフィードバック
                                </ListItemTextArea>
                            </ListItem>
                        </List>
                    </NavigationDrawer>
                    <main
                        children={React.cloneElement(main || children, {
                            location: location,
                            user    : user,
                            ...props
                        })}
                        className={classNames.Main}
                    />
                </div>
            </div>
        )
    }
}
