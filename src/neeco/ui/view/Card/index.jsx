var classNames = require("neeco/ui/view/Card/classNames")
var React      = require("react")

module.exports = (props) =>
    <div
        {... props}
        className={classNames.Card + " " + props.className}
    />
