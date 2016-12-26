var classNames = require("neeco/ui/effect/Shadow/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        {...props}
        className={[className, classNames.Paper].join(" ")}
    />
