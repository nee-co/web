let classNames = require("neeco/ui/view/ListItemAvatar/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <img
        {...props}
        className={[className, classNames.ListItemAvatar].join(" ")}
    />