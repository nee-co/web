let Shadow     = require("react-material/ui/effect/Shadow")
let classNames = require("react-material/ui/view/NavigationDrawer/classNames")
let React      = require("react")
let {Link}     = require("react-router")

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
                classNames.NavigationDrawer,
                visible ? classNames.Visible
              :           classNames.Hidden
            ].join(" ")
        }
        component={"nav"}
        position="right"
    />
