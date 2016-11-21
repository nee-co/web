import classNames from "neeco/views/parts/Menu/classNames"
import React      from "react"

export default (props) =>
    <ul {...props} className={classNames.Menu + " " + props.className} />
