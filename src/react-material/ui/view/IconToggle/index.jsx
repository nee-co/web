let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")

let classNames = require("react-material/ui/view/IconToggle/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <Ripple
        className={
            [
                className,
                classNames.Host,
            ].join(" ")
        }
        component="span"
        fixed
        {...props}
    />
