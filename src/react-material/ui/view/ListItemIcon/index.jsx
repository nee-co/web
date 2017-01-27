let Image      = require("react-material/ui/view/Image")
let classNames = require("react-material/ui/view/ListItemIcon/classNames")
let React      = require("react")

module.exports = ({
    className,
    component = Image,
    Component = component,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.ListItemIcon].join(" ")}
    />
