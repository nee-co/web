let classNames = require("neeco/ui/view/form/TextArea/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <textarea
        {...props}
        className={[className, classNames.textarea].join(" ")}
    />
