import classNames from "neeco/views/parts/Toggle/classNames"
import React      from "react"

export default ({
    onClick
}) =>
    <div
        className={classNames.Toggle}
        onClick={onClick}
    />
