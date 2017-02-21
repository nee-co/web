let Shadow     = require("react-material/ui/effect/Shadow")
let classNames = require("react-material/ui/view/Card/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <Shadow
        className={[className, classNames.Host].join(" ")}
        component="div"
        elevation="2"
        {...props}
    />
