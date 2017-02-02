let Ripple     = require("react-material/ui/effect/Ripple")
let classNames = require("react-material/ui/view/Button/classNames")
let React      = require("react")

let types = {
    fab: {
        className: classNames.FAB
    },
    flat : {
        className: classNames.Flat
    },
    raised: {
        className: classNames.Raised
    }
}

module.exports = ({
    className,
    component = "span",
    dense,
    type = "flat",
    ...props
}) =>
    <Ripple
        {...props}
        className={
            [
                className,
                classNames.Host,
                dense ? classNames.Dense
              :         "",
                types[type].className
            ].join(" ")
        }
        component={component}
        fixed={type == "fab"}
    />
