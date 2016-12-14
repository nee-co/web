var classNames = require("neeco/ui/view/FormTextArea/classNames")
var React      = require("react")

module.exports = (props) =>
    <textarea
        {... props}
        className={classNames.FormTextArea + " " + props.className}
    />
