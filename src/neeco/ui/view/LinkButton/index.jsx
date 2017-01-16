let Button     = require("neeco/ui/view/Button")
let classNames = require("neeco/ui/view/LinkButton/classNames")
let React      = require("react")
let {Link}     = require("react-router")

module.exports = ({
    className,
    ...props
}) =>
    <Button
      className={[className, classNames.LinkButton].join(" ")}
      component={Link}
      {...props}
    />
