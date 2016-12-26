var classNames = require("neeco/ui/view/Logo/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <span
        {...props}
        className={[className, classNames.Logo].join(" ")}
    >
        Nee-co
    </span>
