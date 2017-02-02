let React    = require("react")
let ListItem = require("react-material/ui/view/ListItem")

let classNames = require("react-material/ui/view/Tab/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <ListItem
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
