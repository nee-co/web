var Menu       = require("neeco/views/parts/Menu")
var classNames = require("neeco/views/parts/PopupMenu/classNames")
var React      = require("react")

module.exports = (props) =>
    <Menu {...props} className={classNames.PopupMenu + " " + props.className} />
