var classNames = require("neeco/ui/view/Button/classNames")
var React      = require("react")

module.exports = (props) =>
    <span
        {... props}
        className={classNames.Button + " " + props.className}
    />
