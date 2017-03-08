let React = require("react")

let classNames = require("react-material/ui/view/Toggle/classNames")

module.exports = ({
    component = "span",
    Component = component,
    checked,
    disabled,
    ...props
}) =>
    <Component
        className={
            [
                classNames.Host,
                checked ? classNames.Checked
              :          undefined,
                disabled ? classNames.Disabled
              :            undefined
            ].join(" ")
        }
        {...props}
    />
