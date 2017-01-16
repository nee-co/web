let Ripple     = require("neeco/ui/effect/Ripple")
let classNames = require("neeco/ui/view/ListItem/classNames")
let React      = require("react")

module.exports = ({
    className,
    children,
    selected,
    list,
    onListItemClick,
    ...props
}) =>
    <li
        {...props}
        className={
            [
                className,
                classNames.ListItem,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
    >
        <Ripple
            children={children}
            disabled={selected}
            onClick={onListItemClick}
        />
        {list}
    </li>
