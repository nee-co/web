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
        <div
            style={{
                transform: "translateX(calc(-100% * " + selectedIndex + "))"
            }}
        >
            {
                Array.from(React.Children.toArray(children).entries()).map(([i, v]) => 
                    <div
                        key={i}
                        children={v}
                    />
                )
            }
        </div>
    </div>
