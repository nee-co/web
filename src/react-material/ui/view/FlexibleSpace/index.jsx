let classNames = require("react-material/ui/view/FlexibleSpace/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.FlexibleSpace].join(" ")}
        {...props}
    />
