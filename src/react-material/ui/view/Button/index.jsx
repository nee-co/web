let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/Button/classNames")

module.exports = ({
    className,
    dense,
    disabled,
    type = "flat",
    ...props
}) =>
    <Ripple
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :            undefined,
                dense ? classNames.Dense
              :         "",
                type == "fab"    ? classNames.FAB
              : type == "flat"   ? classNames.Flat
              : type == "raised" ? classNames.Raised
              :                    undefined
            ].join(" ")
        }
        component="span"
        disabled={disabled}
        fixed={type == "fab"}
        {...props}
    />
