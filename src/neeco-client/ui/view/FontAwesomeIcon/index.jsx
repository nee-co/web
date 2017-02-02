let React = require("react")

let classNames = require("neeco-client/ui/view/FontAwesomeIcon/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <span
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
