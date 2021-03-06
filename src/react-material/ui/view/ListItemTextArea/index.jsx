let React = require("react")

let classNames = require("react-material/ui/view/ListItemTextArea/classNames")

module.exports = ({
    className,
    component = "div",
    Component = component,
    selected,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
