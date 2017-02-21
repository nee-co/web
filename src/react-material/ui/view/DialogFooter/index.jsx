let React        = require("react")
let LinearLayout = require("react-material/ui/view/LinearLayout")

let classNames = require("react-material/ui/view/DialogFooter/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <LinearLayout
        className={[className, classNames.Host].join(" ")}
        component="div"
        orientation="horizontal"
        {...props}
    />
