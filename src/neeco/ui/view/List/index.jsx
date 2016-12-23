var classNames = require("neeco/ui/view/List/classNames")
var React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <ul
        {...props}
        className={className + " " + classNames.List}
    />
