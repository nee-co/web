var Menu       = require("neeco/views/parts/Menu")
var MenuItem   = require("neeco/views/parts/MenuItem")
var classNames = require("neeco/views/parts/NavigationBar/classNames")
var PopupMenu  = require("neeco/views/parts/PopupMenu")
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
            <nav className={className + " " + classNames.NavigationBar}>
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
                      display : this.state.profileIsSelected ? "block" : "none"
                  }}
                />
                <PopupMenu
                  style={{
                      display: this.state.profileIsSelected ? "block" : "none"
                  }}
                >
                  <PopupMenuItemA
                    className={classNames.UserIcon}
                    to="/settings"
                  >
                    プロフィールと設定
                  </PopupMenuItemA>
                  <PopupMenuItemA
                    className={classNames.QuestionIcon}
                    to={"/"}
                  >
                    ヘルプ
                  </PopupMenuItemA>
                  <PopupMenuItemA
                    className={classNames.FeedbackIcon}
                    to={"/"}
                  >
                    フィードバック
                  </PopupMenuItemA>
                  <PopupMenuItemA
                    className={classNames.SignOutIcon}
                    onClick={onSignOut}
                    to={"/"}
                  >
                    サインアウト
                  </PopupMenuItemA>
                </PopupMenu>
              </div>
              <Menu>
                <MenuItemA
                  className={classNames.DashboardIcon}
                  location={location}
                  to="/"
                >
                  ダッシュボード
                </MenuItemA>
                <MenuItemA
                  className={classNames.CalendarIcon}
                  location={location}
                  to="/events"
                >
                  イベント
                </MenuItemA>
                <MenuItemA
                  className={classNames.UsersIcon}
                  location={location}
                  to="/groups"
                >
                  グループ
                </MenuItemA>
                <MenuItemA
                  className={classNames.ArchiveIcon}
                  location={location}
                  to="/files"
                >
                  ファイル
                </MenuItemA>
              </Menu>
            </nav>
        )
    }
}

var MenuItemA = ({
    className,
    children,
    location: {
        pathname
    },
    to
}) =>
    <MenuItem>
      <Link
        className={className + " " + (
            pathname == to ? classNames.SelectedMenuItemA
                           : classNames.MenuItemA
        )}
        to={to}
      >
        {children}
      </Link>
    </MenuItem>

var PopupMenuItemA = (props) =>
    <MenuItem>
      <Link {... props}
        className={props.className + " " + classNames.PopupMenuItemA}
      />
    </MenuItem>
