let React = require("react")

let classNames = require("neeco-client/ui/view/Logo/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <span
        {...props}
        className={[className, classNames.Host].join(" ")}
    >
        Nee-co
    </span>
