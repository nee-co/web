let Logo         = require("neeco-client/ui/view/Logo")
let React        = require("react")
let ToolbarTitle = require("react-material/ui/view/ToolbarTitle")

let classNames = require("neeco-client/ui/view/DefaultTitle/classNames")

module.exports = ({
    children,
    className,
    ...props
}) =>
    <ToolbarTitle
        {...props}
        className={[className, classNames.Host].join(" ")}
    >
        <Logo />
        <div>
            {children}
        </div>
    </ToolbarTitle>
