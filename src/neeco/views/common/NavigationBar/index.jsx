import Item       from "neeco/views/common/NavigationBar/Item"
import Menu       from "neeco/views/common/NavigationBar/Menu"
import SubItem    from "neeco/views/common/NavigationBar/SubItem"
import style      from "neeco/views/common/NavigationBar/style"
import ScrollArea from "neeco/views/common/ScrollArea"
import React      from "react"

export default ({
    className,
    location,
    selectedItem,
    onClickAvatar,
    onSelectItem,
    user
}) =>
    <ScrollArea className={className + " " + style.NavigationBar}>
      <nav>
        <div className={style.Profile}>
          <div className={style.UserImage} style={{backgroundImage: user ? "url(" + user.image + ")" : undefined}} />
          &nbsp;{user ? user.number : ""}&nbsp;
        </div>
        <Menu>
          <Item text="Dashboard" path="/" onClick={onSelectItem} className={style.DashboardIcon} />
          <Item text="イベント" className={style.CalendarIcon} >
            <Menu>
              <SubItem text="探す" path="/events" onClick={onSelectItem} className={style.Icon} />
              <SubItem text="開催する" path="/new_event" onClick={onSelectItem} className={style.Icon} />
            </Menu>
          </Item>
          <Item text="ファイル" path="/files" className={style.ArchiveIcon} />
          <Item text="Wiki" className={style.FileIcon}>
            <Menu>
              <SubItem text="見る" path="/wiki" className={style.Icon} />
              <SubItem text="作る" path="/new_wiki" className={style.Icon} />
            </Menu>
          </Item>
          <Item text="設定" path="/settings" className={style.CogIcon} />
        </Menu>
      </nav>
    </ScrollArea>
