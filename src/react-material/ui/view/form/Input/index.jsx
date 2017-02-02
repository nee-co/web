let React = require("react")

let classNames = require("react-material/ui/view/form/Input/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <input
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
