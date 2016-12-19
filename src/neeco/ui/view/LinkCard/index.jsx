var classNames = require("neeco/ui/view/LinkCard/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = (props) =>
    <Link
        {... props}
        className={classNames.LinkCard + " " + props.className}
    />
