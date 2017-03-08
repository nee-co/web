let React  = require("react")
let Avatar = require("react-material/ui/view/Avatar")

let classNames = require("react-material/ui/view/ListItemAvatar/classNames")

module.exports = ({
    className,
    selected,
    ...props
}) =>
    <Avatar
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
