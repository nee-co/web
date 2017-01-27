let classNames = require("react-material/ui/control/DialogBody/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={[className, classNames.DialogBody].join(" ")}
    />
