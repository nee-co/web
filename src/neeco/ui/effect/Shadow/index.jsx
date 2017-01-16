let classNames = require("neeco/ui/effect/Shadow/classNames")
let React      = require("react")

let toBoxShadow = ({
    elevation,
    position
}) =>
    [
        position == "left"  ? -elevation + "px"
      : position == "right" ? elevation + "px"
      :                       "0",
        position == "top"    ? -elevation + "px"
      : position == "bottom" ? elevation + "px"
      :                        "0",
        elevation + "px",
        "0",
        "rgba(0, 0, 0, .1)"
    ].join(" ")

module.exports = ({
    className,
    component = "div",
    Component = component,
    elevation = 2,
    position = "bottom",
    style,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Shadow].join(" ")}
        style={Object.assign({
            boxShadow: toBoxShadow({
                elevation: elevation,
                position : position
            })
        }, style)}
    />
