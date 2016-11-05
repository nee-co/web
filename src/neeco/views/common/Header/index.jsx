import style  from "neeco/views/common/Header/style"
import Toggle from "neeco/views/common/Toggle"
import React  from "react"

export default ({
  onToggle
}) =>
    <header className={style.Header}>
      <Toggle onClick={onToggle} />
      <h1 className={style.Logo}>Nee-co</h1>
    </header>
