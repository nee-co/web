let Shadow          = require("react-material/ui/effect/Shadow")
let classNames      = require("react-material/ui/view/Toolbar/classNames")
let React           = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <Shadow
        className={[className, classNames.Toolbar].join(" ")}
        {...props}
    />
