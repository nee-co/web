import classNames from "neeco/views/parts/FormButton/classNames"
import React      from "react"

export default (props) =>
    <button {... props} className={classNames.FormButton + " " + props.className} />
