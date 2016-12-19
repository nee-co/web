var classNames = require("neeco/ui/view/form/Button/classNames")
var React      = require("react")

module.exports = (props) =>
    <button
        {... props}
        className={classNames.Button + " " + props.className}
    />
