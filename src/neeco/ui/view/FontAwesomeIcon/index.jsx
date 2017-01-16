let classNames = require("neeco/ui/view/FontAwesomeIcon/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) => 
    <span
        {...props}
        className={[className, classNames.FontAwesomeIcon].join(" ")}
    />
