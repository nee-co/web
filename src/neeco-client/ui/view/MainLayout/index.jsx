let GetUserByToken   = require("neeco-client/api/request/GetUserByToken")
let Logo             = require("neeco-client/ui/view/Logo")
let React            = require("react")
let Ripple           = require("react-material/ui/effect/Ripple")
let Button           = require("react-material/ui/view/Button")
let Divider          = require("react-material/ui/view/Divider")
let FlexibleSpace    = require("react-material/ui/view/FlexibleSpace")
let LinearLayout     = require("react-material/ui/view/LinearLayout")
let List             = require("react-material/ui/view/List")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")
let MaterialIcon     = require("react-material/ui/view/MaterialIcon")
let Menu             = require("react-material/ui/view/Menu")
let NavigationDrawer = require("react-material/ui/view/NavigationDrawer")
let Toolbar          = require("react-material/ui/view/Toolbar")
let ToolbarTitle     = require("react-material/ui/view/ToolbarTitle")
let DropdownButton   = require("react-material/ui/view/form/DropdownButton")

let classNames = require("neeco-client/ui/view/MainLayout/classNames")

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
            onSignOut,
            user,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <Toolbar>
                    <Ripple
                        children={"menu"}
                        className={classNames.Toggle}
                        component={MaterialIcon}
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
                                ["/",         ""],
                                ["/events",   "イベント"],
                                ["/folders",  "ドライブ"],
                                ["/groups",   "グループ"],
                                ["/settings", "設定"],
                                ["/users",    "ユーザー"]
                            ]
                                .sort((x, y) => x[0] < y[0])
                                .find(x => new RegExp("^" + x[0]).test(location.pathname))
                                [1]
                        }
                    </ToolbarTitle>
                    <FlexibleSpace />
                </Toolbar>
                <LinearLayout
                    className={classNames.Contents}
                    orientation="horizontal"
                >
                    <NavigationDrawer
                        elevation={
                          (
                              typeof(window) == "undefined" ? 0
                            : window.innerWidth < 640       ? undefined
                            :                                 0
                          )
                        }
                        visible={
                          (
                              typeof(window) == "undefined" ? this.state.drawerIsVisible
                            : window.innerWidth < 640       ? !this.state.drawerIsVisible
                            :                                 this.state.drawerIsVisible
                          )
                        }
                        onCancel={() => this.setState({
                            drawerIsVisible: !this.state.drawerIsVisible
                        })}
                        onClick={e => {
                            if (window.innerWidth < 640)
                                this.setState({
                                    drawerIsVisible: !this.state.drawerIsVisible
                                })
                        }}
                    >
                        <List
                            location={location}
                        >
                            <ListItem
                                disabled
                            >
                                <ListItemIcon
                                    src={user && user.image}
                                />
                                <DropdownButton
                                    style={{
                                        marginLeft: "-21px"
                                    }}
                                    value={
                                        user ? user.number
                                      :        "G000"
                                    }
                                >
                                    <ListItem>
                                        {
                                            user ? user.number
                                          :        "G000"
                                        }
                                    </ListItem>
                                    <ListItem
                                        onClick={onSignOut}
                                    >
                                        {"サインアウト"}
                                    </ListItem>
                                </DropdownButton>
                            </ListItem>
                            <ListItem
                                to="/"
                            >
                                <ListItemIcon
                                    children={"home"}
                                    component={MaterialIcon}
                                />
                                <ListItemTextArea>
                                    ホーム
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/events"
                            >
                                <ListItemIcon
                                    children={"event"}
                                    component={MaterialIcon}
                                />
                                <ListItemTextArea>
                                    イベント
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/groups"
                            >
                                <ListItemIcon
                                    children={"group"}
                                    component={MaterialIcon}
                                />
                                <ListItemTextArea>
                                    グループ
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/users"
                            >
                                <ListItemIcon
                                    children={"person"}
                                    component={MaterialIcon}
                                />
                                <ListItemTextArea>
                                    ユーザー
                                </ListItemTextArea>
                            </ListItem>
                            <ListItem
                                to="/folders"
                            >
                                <ListItemIcon
                                    children={"storage"}
                                    component={MaterialIcon}
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
                                    children={"settings"}
                                    component={MaterialIcon}
                                />
                                <ListItemTextArea>
                                    設定
                                </ListItemTextArea>
                            </ListItem>
                        </List>
                    </NavigationDrawer>
                    <main
                        children={React.cloneElement(
                            children,
                            {
                                user: user,
                                ...props
                            }
                        )}
                        className={classNames.Main}
                    />
                </LinearLayout>
            </div>
        )
    }
}
