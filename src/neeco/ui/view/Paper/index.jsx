var classNames = require("neeco/ui/view/Paper/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={className + " " + classNames.Paper}
    />
