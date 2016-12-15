var classNames = require("neeco/ui/view/List/classNames")
var React      = require("react")

module.exports = (props) =>
    <ul
        {... props}
        className={classNames.List + " " + props.className}
    />
