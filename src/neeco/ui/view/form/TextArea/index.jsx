var classNames = require("neeco/ui/view/form/TextArea/classNames")
var React      = require("react")

module.exports = (props) =>
    <textarea
        {... props}
        className={classNames.TextArea + " " + props.className}
    />
