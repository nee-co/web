let React = require("react")

let classNames = require("react-material/ui/view/ViewPager/classNames")

module.exports = ({
    children,
    className,
    component = "div",
    Component = component,
    selectedIndex,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
    >
        {Array.from(React.Children.toArray(children).entries()).map(([i, x]) =>
            React.cloneElement(
                x,
                {
                    style: {
                        left     : -100 * i + "%",
                        transform: "translate(" + 100 * (i - selectedIndex) + "%, 0)",
                        ...x.props.style
                    }
                }
            )
        )}
    </Component>
