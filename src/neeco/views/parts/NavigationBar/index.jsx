import Menu       from "neeco/views/parts/Menu"
import MenuItem   from "neeco/views/parts/MenuItem"
import classNames from "neeco/views/parts/NavigationBar/classNames"
import React      from "react"
import {Link}     from "react-router"

export default class extends React.Component {
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
                {user ? user.name   : ""}&nbsp;<br />
                <div 
                  className={classNames.PopupBackground}
                  onClick={() => this.setState({
                      profileIsSelected: !this.state.profileIsSelected
                  })}
                  style={{
                      display : this.state.profileIsSelected ? "block" : "none"
                  }}
                />
                <Menu
                  className={classNames.Popup}
                  style={{
                      display: this.state.profileIsSelected ? "block" : "none"
                  }}
                >
                  <MenuItemB to="/settings">
                    プロフィールと設定
                  </MenuItemB>
                  <MenuItemB to={"/"}>
                    ヘルプ
                  </MenuItemB>
                  <MenuItemB to={"/"}>
                    フィードバック
                  </MenuItemB>
                  <MenuItemB
                    onClick={onSignOut}
                    to={"/"}
                  >
                    サインアウト
                  </MenuItemB>
                </Menu>
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

var MenuItemB = (props) =>
    <MenuItem>
      <Link {... props}
        className={props.className + " " + classNames.MenuItemB}
      />
    </MenuItem>
