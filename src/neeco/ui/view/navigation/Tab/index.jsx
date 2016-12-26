var classNames = require("neeco/ui/view/navigation/Tab/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Tab].join(" ")}
        {...props}
    />
