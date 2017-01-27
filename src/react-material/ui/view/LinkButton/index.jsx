let Button     = require("react-material/ui/view/Button")
let classNames = require("react-material/ui/view/LinkButton/classNames")
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
