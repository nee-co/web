let React = require("react")

let classNames = require("react-material/ui/view/ViewPager/classNames")

module.exports = ({
    children,
    className,
    selectedIndex,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
    >
        {Array.from(React.Children.toArray(children).entries()).map(([i, x]) => 
            React.cloneElement(
                x,
                {
                    style: Object.assign(
                        {
                            left     : "calc(-100% * " + i + ")",
                            transform: "translateX(calc(100% * " + (i - selectedIndex) + "))"
                        },
                        x.props.style
                    )
                }
            )
        )}
    </div>
