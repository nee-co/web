var classNames = require("neeco/ui/view/form/Button/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <button
        {...props}
        className={[className, classNames.Button].join(" ")}
    />
