let React = require("react")

let classNames = require("react-material/ui/view/form/TextArea/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <textarea
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
