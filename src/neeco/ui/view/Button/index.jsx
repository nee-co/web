var classNames = require("neeco/ui/view/Button/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <span
        {...props}
        className={[className, classNames.Button].join(" ")}
    />
