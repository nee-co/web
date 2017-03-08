let Shadow     = require("react-material/ui/effect/Shadow")
let classNames = require("react-material/ui/view/Card/classNames")
let React      = require("react")

module.exports = ({
    className,
    raised,
    ...props
}) =>
    <Shadow
        className={[className, classNames.Host].join(" ")}
        elevation={
            raised ? "8"
          :          "2"
        }
        {...props}
    />
