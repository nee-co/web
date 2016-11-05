import Item  from "neeco/views/common/NavigationBar/Item"
import style from "neeco/views/common/NavigationBar/SubItem/style"
import React from "react"
import {Link} from "react-router"

export default ({className, path, text}) =>
    <li className={style.SubItem}>
      <Link to={path} className={className + " " + style.Text}>
        {text}
      </Link>
    </li>
