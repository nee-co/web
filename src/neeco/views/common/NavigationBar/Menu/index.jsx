import style from "neeco/views/common/NavigationBar/Menu/style"
import React from "react"

export default ({children}) =>
    <ul className={style.Menu}>
      {children}
    </ul>
