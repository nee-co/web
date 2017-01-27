let classNames = require("react-material/ui/view/ToolbarTitle/classNames")
let React      = require("react")

module.exports = ({
    className,
    component = "div",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.ToolbarTitle].join(" ")}
        {...props}
    />
