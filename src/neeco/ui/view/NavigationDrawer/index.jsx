let Shadow          = require("neeco/ui/effect/Shadow")
let FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
let List            = require("neeco/ui/view/List")
let ListItem        = require("neeco/ui/view/ListItem")
let Popup           = require("neeco/ui/view/Popup")
let classNames      = require("neeco/ui/view/NavigationDrawer/classNames")
let React           = require("react")
let {Link}          = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            indexes  : [0],
            lastIndex: undefined
        })
    }

    render() {
        let {
            className,
            location,
            onSignOut,
            user,
            ...props
        } = this.props

        return (
            <Shadow
                {...props}
                className={[className, classNames.NavigationDrawer].join(" ")}
                component={"nav"}
                elevation={0}
                position="right"
            >
                <List
                    className={
                        [
                            classNames.List,
                            (
                                this.state.indexes.slice(-1)[0] == 0 ? classNames.Selected
                              : this.state.indexes.includes(0)       ? classNames.Selected2
                              :                                        undefined
                            )
                        ].join(" ")
                    }
                >
                    <LinkListItem
                        className={classNames.Profile}
                        list={
                            <List
                                className={
                                    [
                                        classNames.List,
                                        (
                                            this.state.indexes.slice(-1)[0] == 1 ? classNames.Selected
                                          : this.state.indexes.includes(1)       ? classNames.Selected2
                                          :                                        undefined
                                        )
                                    ].join(" ")
                                }
                            >
                                <LinkListItem
                                    location={location}
                                    onClick={(e) => {
                                        this.setState({
                                            indexes: this.state.indexes.filter((x) => x != 1)
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
                        onListItemClick={(e) => {
                            this.setState({
                                indexes: this.state.indexes.concat(1)
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
            </Shadow>
        )
    }
}

let LinkListItem = ({
    children,
    location: {
        pathname
    },
    to,
    selected = (
        new RegExp("^" + to).test(pathname)
     && (to == pathname || to != "/")
    ),
    ...props
}) =>
    <ListItem
        {...props}
        className={classNames.ListItem}
        selected={selected}
    >
        <Link
            children={children}
            to={
                selected ? undefined
                         : to
            }
        />
    </ListItem>

let ListItemIcon = (props) =>
    <FontAwesomeIcon
        {...props}
        className={classNames.ListItemIcon}
    />
