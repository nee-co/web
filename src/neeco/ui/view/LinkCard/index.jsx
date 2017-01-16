let Card       = require("neeco/ui/view/Card")
let classNames = require("neeco/ui/view/LinkCard/classNames")
let React      = require("react")
let {Link}     = require("react-router")

module.exports = ({
    className,
    ...props
}) =>
    <Card
        {...props}
        className={[className, classNames.LinkCard].join(" ")}
        component={Link}
    />
