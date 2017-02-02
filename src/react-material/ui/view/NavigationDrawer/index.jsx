let React  = require("react")
let Shadow = require("react-material/ui/effect/Shadow")

let classNames = require("react-material/ui/view/NavigationDrawer/classNames")

module.exports = ({
    className,
    visible,
    ...props
}) =>
    <Shadow
        {...props}
        className={
            [
                className,
                classNames.Host,
                visible ? classNames.Visible
              :           classNames.Hidden
            ].join(" ")
        }
        component={"nav"}
        position="right"
    />
