var Card            = require("neeco/ui/view/Card")
var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var List            = require("neeco/ui/view/List")
var ListItem        = require("neeco/ui/view/ListItem")
var classNames      = require("neeco/ui/view/NavigationBar/classNames")
var PopupCard       = require("neeco/ui/view/PopupCard")
var React           = require("react")
var {Link}          = require("react-router")

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
                <div>
                    <div
                        className={classNames.Profile}
                        onClick={() => this.setState({
                            profileIsSelected: true
                        })}
                    >
                        <div
                            className={classNames.UserImage}
                            style={{
                                backgroundImage: user ? "url(" + user.image + ")" : undefined
                            }}
                        />
                        {user ? user.number : ""}&nbsp;<br />
                    </div>
                    <PopupCard
                        className={classNames.PopupCard}
                        isVisible={this.state.profileIsSelected}
                    >
                        <List>
                            <ListItemB
                                to="/settings"
                            >
                                <FontAwesomeIcon children={"\uF007"} />
                                プロフィールと設定
                            </ListItemB>
                            <ListItemB
                                to={"/"}
                            >
                                <FontAwesomeIcon children={"\uF128"} />
                                ヘルプ
                            </ListItemB>
                            <ListItemB
                                to={"/"}
                            >
                                <FontAwesomeIcon children={"\uF27B"} />
                                フィードバック
                            </ListItemB>
                            <ListItemB
                                onClick={onSignOut}
                                to={"/"}
                            >
                                <FontAwesomeIcon children={"\uF08B"} />
                                サインアウト
                            </ListItemB>
                        </List>
                    </PopupCard>
                </div>
                <List>
                    <ListItemA
                        location={location}
                        to="/"
                    >
                        <FontAwesomeIcon
                            children={"\uF0E4"}
                            className={classNames.Icon}
                        />
                        ホーム
                    </ListItemA>
                    <ListItemA
                        location={location}
                        to="/events"
                    >
                        <FontAwesomeIcon
                            children={"\uF073"}
                            className={classNames.Icon}
                        />
                        イベント
                    </ListItemA>
                    <ListItemA
                        location={location}
                        to="/groups"
                    >
                        <FontAwesomeIcon
                            children={"\uF0C0"}
                            className={classNames.Icon}
                        />
                        グループ
                    </ListItemA>
                    <ListItemA
                        location={location}
                        to="/file"
                    >
                        <FontAwesomeIcon
                            children={"\uF0A0"}
                            className={classNames.Icon}
                        />
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
    <ListItem 
        className={className + " " + (
            pathname == to ? classNames.SelectedListItemA
                           : classNames.ListItemA
        )}
    >
        <Link
            to={(
                pathname == to ? ""
                               : to
            )}
        >
            {children}
        </Link>
    </ListItem>

var ListItemB = (props) =>
    <ListItem>
        <Link
            {... props}
            className={props.className + " " + classNames.ListItemB}
        />
    </ListItem>
