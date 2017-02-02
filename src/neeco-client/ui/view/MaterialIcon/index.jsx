let React = require("react")

let classNames = require("neeco-client/ui/view/MaterialIcon/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <span
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
