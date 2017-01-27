let classNames = require("react-material/ui/view/Divider/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={[className, classNames.Divider].join(" ")}
    />
