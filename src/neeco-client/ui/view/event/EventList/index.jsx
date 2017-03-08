let React = require("react")
let List  = require("react-material/ui/view/List")

let classNames = require("neeco-client/ui/view/event/EventList/classNames")

module.exports = ({
    children,
    className,
    type = "linear",
    ...props
}) =>
    <List
        children={React.Children.toArray(children).map(
            x => React.cloneElement(
                x,
                {
                    type: type,
                    ...x.props
                }
            )
        )}
        className={
            [
                className,
                classNames.Host,
                type == "grid"   ? classNames.Grid
              : type == "linear" ? classNames.Linear
              :                    undefined
            ].join(" ")
        }
        {...props}
    />
