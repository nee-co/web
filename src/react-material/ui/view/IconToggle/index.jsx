let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/IconToggle/classNames")

module.exports = ({
    className,
    disabled,
    ...props
}) =>
    <Ripple
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :            undefined
            ].join(" ")
        }
        component="span"
        disabled={disabled}
        fixed
        {...props}
    />
