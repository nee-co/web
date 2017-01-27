let classNames = require("react-material/ui/view/ListItemTextArea/classNames")
let React      = require("react")

module.exports = ({
    className,
    component = "div",
    Component = component,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.ListItemTextArea].join(" ")}
    />
