var classNames = require("neeco/ui/view/ListItem/classNames")
var React      = require("react")

module.exports = ({
    className,
    isSelected,
    ...props
}) =>
    <li
        {...props}
        className={[
            className,
            isSelected ? classNames.SelectedListItem
           :              classNames.ListItem
        ].join(" ")}
    />
