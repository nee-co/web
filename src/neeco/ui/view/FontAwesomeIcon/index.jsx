var classNames = require("neeco/ui/view/FontAwesomeIcon/classNames")
var React      = require("react")

module.exports = (props) => 
    <span
        {... props}
        className={classNames.FontAwesomeIcon + " " + props.className}
    />
