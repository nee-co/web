let React  = require("react")
let Ripple = require("react-material/ui/effect/Ripple")
let match  = require("react-material/util/match")
let {Link} = require("react-router")

let classNames = require("react-material/ui/view/ListItem/classNames")

module.exports = ({
    className,
    children,
    disabled,
    location,
    to,
    selected = location && match({
        location          : location,
        locationDescriptor: to
    }),
    value,
    ...props
}) =>
    <li
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :            undefined,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
        {...props}
    >
        <Ripple
            children={
                React.Children.toArray(children).map(x => 
                    typeof(x) == "string" ? x
                  : typeof(x) == "number" ? x
                  :                         React.cloneElement(
                        x,
                        {
                            selected: selected,
                        }
                    )
                )
            }
            component={
                to ? Link
              :      undefined
            }
            disabled={disabled}
            to={to}
        />
    </li>
