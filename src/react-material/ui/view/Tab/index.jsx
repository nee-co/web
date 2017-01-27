let ListItem   = require("react-material/ui/view/ListItem")
let classNames = require("react-material/ui/view/Tab/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <ListItem
        className={[className, classNames.Tab].join(" ")}
        {...props}
    />
