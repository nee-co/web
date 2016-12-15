var List       = require("neeco/ui/view/List")
var ListItem   = require("neeco/ui/view/ListItem")
var classNames = require("neeco/ui/view/NavigationBar/classNames")
var PopupList  = require("neeco/ui/view/PopupList")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            profileIsSelected: false
        })
    }

    render() {
        var {
            className,
            location,
            onSignOut,
            user
        } = this.props

        return (
            <nav
                className={className + " " + classNames.NavigationBar}
            >
                <div
                    className={classNames.Profile}
                    onClick={() => this.setState({
                        profileIsSelected: !this.state.profileIsSelected
                    })}
                >
                    <div
                        className={classNames.UserImage}
                        style={{
                            backgroundImage: user ? "url(" + user.image + ")" : undefined
                        }}
                    />
                    {user ? user.number : ""}&nbsp;<br />
                    <div
                        className={classNames.PopupBackground}
                        onClick={() => this.setState({
                            profileIsSelected: !this.state.profileIsSelected
                        })}
                        style={{
                            display: this.state.profileIsSelected ? "block" : "none"
                        }}
                    />
                    <PopupList
                        style={{
                            display: this.state.profileIsSelected ? "block" : "none"
                        }}
                    >
                        <PopupListItemA
                            className={classNames.UserIcon}
                            to="/settings"
                        >
                            プロフィールと設定
                        </PopupListItemA>
                        <PopupListItemA
                            className={classNames.QuestionIcon}
                            to={"/"}
                        >
                            ヘルプ
                        </PopupListItemA>
                        <PopupListItemA
                            className={classNames.FeedbackIcon}
                            to={"/"}
                        >
                            フィードバック
                        </PopupListItemA>
                        <PopupListItemA
                            className={classNames.SignOutIcon}
                            onClick={onSignOut}
                            to={"/"}
                        >
                            サインアウト
                        </PopupListItemA>
                    </PopupList>
                </div>
                <List>
                    <ListItemA
                        className={classNames.DashboardIcon}
                        location={location}
                        to="/"
                    >
                        ダッシュボード
                    </ListItemA>
                    <ListItemA
                        className={classNames.CalendarIcon}
                        location={location}
                        to="/events"
                    >
                        イベント
                    </ListItemA>
                    <ListItemA
                        className={classNames.UsersIcon}
                        location={location}
                        to="/groups"
                    >
                        グループ
                    </ListItemA>
                    <ListItemA
                        className={classNames.ArchiveIcon}
                        location={location}
                        to="/files"
                    >
                        ファイル
                    </ListItemA>
                </List>
            </nav>
        )
    }
}

var ListItemA = ({
    className,
    children,
    location: {
        pathname
    },
    to
}) =>
    <ListItem>
        <Link
            className={className + " " + (
                pathname == to ? classNames.SelectedListItemA
                               : classNames.ListItemA
            )}
            to={(
                pathname == to ? ""
                               : to
            )}
        >
            {children}
        </Link>
    </ListItem>

var PopupListItemA = (props) =>
    <ListItem>
        <Link
            {... props}
            className={props.className + " " + classNames.PopupListItemA}
        />
    </ListItem>
