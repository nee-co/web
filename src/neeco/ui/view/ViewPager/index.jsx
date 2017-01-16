let classNames = require("neeco/ui/view/ViewPager/classNames")
let React      = require("react")

module.exports = ({
    children,
    className,
    selectedIndex,
    ...props
}) =>
    <div
        className={[className, classNames.ViewPager].join(" ")}
    >
        <div
            style={{
                marginLeft: "calc(-100% *" + selectedIndex + ")"
            }}
        >
            {
                Array.from(children.entries()).map(([i, v]) => 
                    <div
                        key={i}
                        children={v}
                    />
                )
            }
        </div>
    </div>
