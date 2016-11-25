var classNames = require("neeco/views/parts/LinkButton/classNames")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = (props) =>
    <Link {... props} className={classNames.LinkButton + " " + props.className} />
