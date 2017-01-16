let classNames = require("neeco/ui/view/List/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <ul
        {...props}
        className={[className, classNames.List].join(" ")}
    />
