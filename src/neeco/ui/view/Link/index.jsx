var classNames = require("neeco/ui/view/Link/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = (props) =>
    <Link
        {... props}
        className={classNames.Link + " " + props.className}
    />