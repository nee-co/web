var classNames = require("neeco/ui/view/Toggle/classNames")
var React      = require("react")

module.exports = ({
    onClick
}) =>
    <span
        className={classNames.Toggle}
        onClick={onClick}
    />
