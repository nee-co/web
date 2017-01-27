let React = require("react")

let classNames = require("neeco/ui/view/FontAwesomeIcon/classNames")

module.exports = ({
    className,
    ...props
}) => 
    <span
        {...props}
        className={[className, classNames.FontAwesomeIcon].join(" ")}
    />
