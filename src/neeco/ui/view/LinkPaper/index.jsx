var classNames = require("neeco/ui/view/LinkPaper/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = ({
    className,
    ...props
}) =>
    <Link
        {...props}
        className={[className, classNames.LinkPaper].join(" ")}
    />
