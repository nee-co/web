let React  = require("react")
let Toolbar = require("react-material/ui/view/Toolbar")

let classNames = require("react-material/ui/view/AppBar/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <Toolbar
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
