var classNames = require("neeco/ui/view/form/Input/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <input
        {...props}
        className={[className, classNames.Input].join(" ")}
    />
