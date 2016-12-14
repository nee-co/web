var classNames = require("neeco/ui/view/LinkButton/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = (props) =>
    <Link
        {... props}
        className={classNames.LinkButton + " " + props.className}
    />
