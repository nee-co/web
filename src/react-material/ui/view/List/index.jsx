let React        = require("react")
let LinearLayout = require("react-material/ui/view/LinearLayout")

let classNames = require("react-material/ui/view/List/classNames")

module.exports = ({
    children,
    className,
    location,
    ...props
}) =>
    <LinearLayout
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        component="ul"
        {...props}
    >
        {React.Children.toArray(children).map(
            x => React.cloneElement(
                x,
                {
                    location: location
                }
            )
        )}
    </LinearLayout>
