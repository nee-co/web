var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var List            = require("neeco/ui/view/List")
var ListItem        = require("neeco/ui/view/ListItem")
var classNames      = require("neeco/ui/view/NavigationBar/classNames")
var Paper           = require("neeco/ui/view/Paper")
var Popup           = require("neeco/ui/view/Popup")
var React           = require("react")
var {Link}          = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedLists: [0],
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
                    style={{
                        marginLeft: this.state.selectedList * -216 + "px"
                    }}
                >
                    <List>
                        <LinkListItem
                            className={classNames.Profile}
                            location={location}
                            onClick={(e) => {
                                this.setState({
                                    selectedList: 1,
                                })
                            }}
                        >
                            <div
                                className={classNames.UserImage}
                                style={{
                                    backgroundImage: user ? "url(" + user.image + ")" : undefined
                                }}
                            />
                            {user ? user.number : ""}&nbsp;<br />
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            to="/"
                        >
                            <ListItemIcon
                                children={"\uF0E4"}
                            />
                            ホーム
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            to="/events"
                        >
                            <ListItemIcon
                                children={"\uF073"}
                            />
                            イベント
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            to="/groups"
                        >
                            <ListItemIcon
                                children={"\uF0C0"}
                            />
                            グループ
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            to="/file"
                        >
                            <ListItemIcon
                                children={"\uF0A0"}
                            />
                            ファイル
                        </LinkListItem>
                    </List>
                    <List>
                        <LinkListItem
                            location={location}
                            onClick={(e) => {
                                this.setState({
                                    selectedList: 0,
                                })
                            }}
                        >
                            <ListItemIcon
                                children={"\uF177"}
                            />
                            戻る
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            to="/settings"
                        >
                            <ListItemIcon
                                children={"\uF007"}
                            />
                            プロフィールと設定
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                        >
                            <ListItemIcon
                                children={"\uF128"}
                            />
                            ヘルプ
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                        >
                            <ListItemIcon
                                children={"\uF27B"}
                            />
                            フィードバック
                        </LinkListItem>
                        <LinkListItem
                            location={location}
                            onClick={onSignOut}
                        >
                            <ListItemIcon
                                children={"\uF08B"}
                            />
                            サインアウト
                        </LinkListItem>
                    </List>
                </div>
            </nav>
        )
    }
}

var LinkListItem = ({
    children,
    location: {
        pathname
    },
    onClick,
    to,
    ...props
}) =>
    <ListItem
        {...props}
        className={classNames.ListItem}
        isSelected={pathname == to}
        onClick={onClick}
    >
        <Link
            children={children}
            to={(
                pathname == to ? ""
                               : to
            )}
        />
    </ListItem>

var ListItemIcon = (props) =>
    <FontAwesomeIcon
        {...props}
        className={classNames.ListItemIcon}
    />
