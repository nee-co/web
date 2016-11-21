import classNames from "neeco/views/parts/Header/classNames"
import Toggle     from "neeco/views/parts/Toggle"
import React      from "react"

export default ({
    onToggle,
    user
}) =>
    <header className={classNames.Header}>
      <Toggle onClick={onToggle} />
      <h1 className={classNames.Logo}>
        Nee-co
      </h1>
    </header>
