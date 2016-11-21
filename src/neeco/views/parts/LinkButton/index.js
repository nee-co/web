import classNames from "neeco/views/parts/LinkButton/classNames"
import React      from "react"
import {Link}     from "react-router"

export default (props) =>
    <Link {... props} className={classNames.LinkButton + " " + props.className} />
