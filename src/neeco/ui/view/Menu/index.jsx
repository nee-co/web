var classNames = require("neeco/ui/view/Menu/classNames")
var React      = require("react")

module.exports = (props) =>
    <ul
        {... props}
        className={classNames.Menu + " " + props.className}
    />
