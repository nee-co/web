var classNames = require("neeco/views/parts/Menu/classNames")
var React      = require("react")

module.exports = (props) =>
    <ul {...props} className={classNames.Menu + " " + props.className} />
