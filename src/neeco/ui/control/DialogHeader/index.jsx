let classNames = require("neeco/ui/control/DialogHeader/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={[className, classNames.DialogHeader].join(" ")}
    />
