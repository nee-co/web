import Item       from "neeco/views/common/NavigationBar/Item"
import Menu       from "neeco/views/common/NavigationBar/Menu"
import SubItem    from "neeco/views/common/NavigationBar/SubItem"
import style      from "neeco/views/common/NavigationBar/style"
//import ScrollArea from "neeco/views/common/ScrollArea"
import React      from "react"

export default ({
    className,
    location,
    user = {name: "G013C1124"},
    selectedItem,
    onSelectItem
}) =>
    <nav className={className + " " + style.NavigationBar}>
      <div className={style.Profile}>
        <img src="/images/sample.jpg" />
        {user.name}
      </div>
      <Menu>
        <Item text="Dashboard" path="/" onClick={onSelectItem} className={style.DashboardIcon} />
        <Item text="イベント" className={style.CalendarIcon} >
          <Menu>
            <SubItem text="探す" path="/events" onClick={onSelectItem} className={style.Icon} />
            <SubItem text="開催する" path="/new_event" onClick={onSelectItem} className={style.Icon} />
          </Menu>
        </Item>
        <Item text="お仕事" className={style.TasksIcon} >
          <Menu>
            <SubItem text="探す" path="/tasks" className={style.Icon} />
            <SubItem text="依頼する" path="/new_task" className={style.Icon} />
            <SubItem text="募集する" path="/new_task" className={style.Icon} />
          </Menu>
        </Item>
        <Item text="ファイル" path="/files" className={style.ArchiveIcon} />
        <Item text="Wiki" className={style.FileIcon}>
          <Menu>
            <SubItem text="見る" path="/wiki" className={style.Icon} />
            <SubItem text="作る" path="/new_wiki" className={style.Icon} />
          </Menu>
        </Item>
        <Item text="アンケート" path="/survey" className={style.QuestionIcon} />
        <Item text="外部リンク" path="/path" className={style.LinkIcon} />
        <Item text="お問い合わせ" path="/" className={style.EnvelopeIcon} />
      </Menu>
    </nav>
