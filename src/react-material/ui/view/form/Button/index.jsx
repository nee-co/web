let Button     = require("react-material/ui/view/Button")
let classNames = require("react-material/ui/view/form/Button/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <Button
        {...props}
        className={[className, classNames.Button].join(" ")}
        component="button"
    />
