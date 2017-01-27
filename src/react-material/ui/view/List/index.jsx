let Divider    = require("react-material/ui/view/Divider")
let classNames = require("react-material/ui/view/List/classNames")
let React      = require("react")

module.exports = ({
    children,
    className,
    component = "ul",
    Component = component,
    location,
    ...props
}) => {
    let children2 = Array.from(React.Children.toArray(children).entries())

    let dividers = children2
        .filter(([i, x]) => x.type == Divider)

    let listItems = children2
        .filter(([i, x]) => x.type != Divider)
        .map(([i, x]) => {
            let divider = dividers.find(([j, x]) => j - 1 == i)

            return React.cloneElement(
                x,
                {
                    children: divider ? React.Children.toArray(x.props.children).concat(divider[1])
                            :           x.props.children,
                    location: location
                }
            )
        })

    return (
        <Component
            {...props}
            children={listItems}
            className={[className, classNames.List].join(" ")}
        />
    )
}
