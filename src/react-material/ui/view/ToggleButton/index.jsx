let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/ToggleButton/classNames")

module.exports = ({
    className,
    disabled,
    selected,
    ...props
}) =>
    <Ripple
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :           undefined,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
        component="span"
        disabled={disabled}
        {...props}
    />
