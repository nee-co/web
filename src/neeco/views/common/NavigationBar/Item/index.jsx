import style  from "neeco/views/common/NavigationBar/Item/style"
import React  from "react"
import {Link} from "react-router"

export default ({className, children, isSelected, onSelect, path, text}) =>
    <li className={style.Item}>
      <Link to={path} className={className + " " + style.Text}>
        {text}
      </Link>
      {children}
    </li>
