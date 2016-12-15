var List       = require("neeco/ui/view/List")
var classNames = require("neeco/ui/view/PopupList/classNames")
var React      = require("react")

module.exports = (props) =>
    <List
        {... props}
        className={classNames.PopupList + " " + props.className}
    />
