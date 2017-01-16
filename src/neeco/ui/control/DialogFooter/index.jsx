let classNames = require("neeco/ui/control/DialogFooter/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={[className, classNames.DialogFooter].join(" ")}
    />
