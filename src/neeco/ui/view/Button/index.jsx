let Ripple     = require("neeco/ui/effect/Ripple")
let classNames = require("neeco/ui/view/Button/classNames")
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
                classNames.Button,
                dense ? classNames.Dense
              :         "",
                types[type].className
            ].join(" ")
        }
        component={component}
        fixed={type == "fab"}
    />
