let classNames = require("react-material/ui/view/form/TextArea/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <textarea
        {...props}
        className={[className, classNames.textarea].join(" ")}
    />
