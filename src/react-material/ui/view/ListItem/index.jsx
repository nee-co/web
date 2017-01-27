let React      = require("react")
let Ripple     = require("react-material/ui/effect/Ripple")
let classNames = require("react-material/ui/view/ListItem/classNames")
let match      = require("react-material/util/match")
let {Link}     = require("react-router")

module.exports = ({
    className,
    children,
    location,
    onListItemClick,
    to,
    selected = location && match({
        location: location,
        locationDescriptor: to
    }),
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
            className={classNames.Link}
            component={Link}
            disabled={selected}
            onClick={onListItemClick}
            to={to}
        />
    </li>
