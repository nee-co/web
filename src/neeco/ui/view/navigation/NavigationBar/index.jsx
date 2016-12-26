var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var List            = require("neeco/ui/view/List")
var ListItem        = require("neeco/ui/view/ListItem")
var Popup           = require("neeco/ui/view/Popup")
var classNames      = require("neeco/ui/view/navigation/NavigationBar/classNames")
var React           = require("react")
var {Link}          = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndexes: [0]
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
                className={[className, classNames.NavigationBar].join(" ")}
            >
                <List
                    className={classNames.List}
                    style={{
                        transform: this.state.selectedIndexes.includes(0) ? undefined
                                 :                                          "translateX(216px)"
                    }}
                >
                    <LinkListItem
                        className={classNames.Profile}
                        list={
                            <List
                                className={classNames.List}
                                style={{
                                    transform: this.state.selectedIndexes.includes(1) ? undefined
                                             :                                          "translateX(216px)"
                                }}
                            >
                                <LinkListItem
                                    location={location}
                                    onClick={(e) => {
                                        this.setState({
                                            selectedIndexes: this.state.selectedIndexes.slice(0, -1)
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
                        }
                        location={location}
                        onClick={(e) => {
                            this.setState({
                                selectedIndexes: this.state.selectedIndexes.concat(1)
                            })
                        }}
                    >
                        <div
                            className={classNames.UserImage}
                            style={{
                                backgroundImage: user && "url(" + user.image + ")"
                            }}
                        />
                        {user && user.number}
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
                        to="/folders"
                    >
                        <ListItemIcon
                            children={"\uF0A0"}
                        />
                        ファイル
                    </LinkListItem>
                </List>
            </nav>
        )
    }
}

var LinkListItem = ({
    children,
    list,
    location: {
        pathname
    },
    to,
    isSelected = (
        new RegExp("^" + to).test(pathname)
     && (to == pathname || to != "/")
    ),
    ...props
}) =>
    <ListItem
        className={classNames.ListItem}
        isSelected={isSelected}
    >
        <Link
            {...props}
            children={children}
            to={
                isSelected ? undefined
                           : to
            }
        />
        {list}
    </ListItem>

var ListItemIcon = (props) =>
    <FontAwesomeIcon
        {...props}
        className={classNames.ListItemIcon}
    />
