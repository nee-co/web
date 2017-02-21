let React = require("react")

let classNames = require("react-material/ui/view/Divider/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
