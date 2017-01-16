let Shadow     = require("neeco/ui/effect/Shadow")
let classNames = require("neeco/ui/view/Card/classNames")
let React      = require("react")

module.exports = ({
    className,
    component = "div",
    ...props
}) =>
    <Shadow
        {...props}
        className={[className, classNames.Card].join(" ")}
        component={component}
        elevation={2}
    />
