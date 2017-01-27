let React = require("react")

let classNames = require("neeco/ui/view/Logo/classNames")

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
