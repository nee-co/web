import Menu       from "neeco/views/parts/Menu"
import classNames from "neeco/views/parts/PopupMenu/classNames"
import React      from "react"

export default (props) =>
    <Menu {...props} className={classNames.PopupMenu + " " + props.className} />
