var classNames = require("neeco/ui/view/FontAwesomeIcon/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) => 
    <span
        {...props}
        className={[className, classNames.FontAwesomeIcon].join(" ")}
    />
