var classNames = require("neeco/ui/view/FormInput/classNames")
var React      = require("react")

module.exports = (props) =>
    <input
        {... props}
        className={classNames.FormInput + " " + props.className}
    />
