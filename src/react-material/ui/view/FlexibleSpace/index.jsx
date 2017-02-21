let React = require("react")

let classNames = require("react-material/ui/view/FlexibleSpace/classNames")

module.exports = ({
    className,
    component = "div",
    Compoenent = component,
    ...props
}) =>
    <Compoenent
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
