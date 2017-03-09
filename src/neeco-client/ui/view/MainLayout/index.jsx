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
let AppBar           = require("react-material/ui/view/AppBar")
let AppBarTitle      = require("react-material/ui/view/AppBarTitle")
let DropdownButton   = require("react-material/ui/view/form/DropdownButton")

let classNames = require("neeco-client/ui/view/MainLayout/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            drawerIsVisible: true,
            notifications  : [],
            mobile         : false,
            resize         : () => {
                let mobile = window.innerWidth < 640
                    
                this.setState({
                    drawerIsVisible:
                        mobile == this.state.mobile ? this.state.drawerIsVisible
                    :                               !this.state.drawerIsVisible
                    ,
                    mobile: mobile
                })
            }
        })
    }

    componentDidMount() {
        let mobile = window.innerWidth < 640

        this.setState({
            drawerIsVisible: !mobile,
            mobile         : mobile
        })

        window.addEventListener("resize", this.state.resize, false)
    }

    componentWillReceiveProps({
        location
    }) {
        if (
            this.state.mobile
         && this.state.drawerIsVisible
         && location.pathname != this.props.location.pathname
        )
            this.setState({
                drawerIsVisible: false
            })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.state.resize, false)
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
                <AppBar
                    id="app_bar"
                >
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
                    <AppBarTitle
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
                    </AppBarTitle>
                    <FlexibleSpace />
                </AppBar>
                <LinearLayout
                    className={classNames.Contents}
                    orientation="horizontal"
                >
                    <NavigationDrawer
                        elevation={
                            this.state.mobile ? undefined
                          :                     0
                        }
                        htmlFor="app_bar"
                        visible={this.state.drawerIsVisible}
                        onCancel={() => this.setState({
                            drawerIsVisible: !this.state.drawerIsVisible
                        })}
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
                                        marginLeft: "-21px",
                                        flexGrow  : 1
                                    }}
                                    value={
                                        user ? user.number
                                      :        "G000A0000"
                                    }
                                >
                                    <ListItem>
                                        {
                                            user ? user.number
                                          :        "G000A0000"
                                        }
                                    </ListItem>
                                    <ListItem
                                        to="/settings"
                                    >
                                        <ListItemTextArea>
                                            設定
                                        </ListItemTextArea>
                                    </ListItem>
                                    <ListItem
                                        onClick={onSignOut}
                                    >
                                        <ListItemTextArea>
                                            サインアウト
                                        </ListItemTextArea>
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
