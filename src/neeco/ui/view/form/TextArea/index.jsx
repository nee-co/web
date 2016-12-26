var classNames = require("neeco/ui/view/form/TextArea/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <textarea
        {...props}
        className={[className, classNames.textarea].join(" ")}
    />
