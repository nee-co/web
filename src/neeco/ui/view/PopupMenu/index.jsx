var Menu       = require("neeco/ui/view/Menu")
var classNames = require("neeco/ui/view/PopupMenu/classNames")
var React      = require("react")

module.exports = (props) =>
    <Menu
        {... props}
        className={classNames.PopupMenu + " " + props.className}
    />
