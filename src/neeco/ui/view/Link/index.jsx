var classNames = require("neeco/ui/view/Link/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = ({
    className,
    ...props
}) =>
    <Link
        {...props}
        className={className + " " + classNames.Link}
    />
