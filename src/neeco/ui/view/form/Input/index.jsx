var classNames = require("neeco/ui/view/form/Input/classNames")
var React      = require("react")

module.exports = (props) =>
    <input
        {... props}
        className={classNames.Input + " " + props.className}
    />
