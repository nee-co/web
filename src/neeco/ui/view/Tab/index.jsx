let classNames = require("neeco/ui/view/Tab/classNames")
let React      = require("react")
let {Link}     = require("react-router")

module.exports = ({
    className,
    ...props
}) =>
    <Link
        className={[className, classNames.Tab].join(" ")}
        {...props}
    />
