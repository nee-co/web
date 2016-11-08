import style  from "neeco/views/common/Header/style"
import Toggle from "neeco/views/common/Toggle"
import React  from "react"
import {Link} from "react-router"

export default ({
  onSignOut,
  onToggle
}) =>
    <header className={style.Header}>
      <div className={style.LeftSide}>
        <Toggle onClick={onToggle} />
        <h1 className={style.Logo}>
          Nee-co
        </h1>
      </div>
      <div className={style.RightSide}>
        <Link className={style.SignOutButton} to="/" onClick={onSignOut}>
          サインアウト
        </Link>
      </div>
    </header>
