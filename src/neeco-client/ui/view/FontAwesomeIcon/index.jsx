let React = require("react")

let classNames = require("neeco-client/ui/view/FontAwesomeIcon/classNames")

module.exports = ({
    className,
    component = "span",
    Component = component,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
