var classNames = require("neeco/views/parts/Toggle/classNames")
var React      = require("react")

module.exports = ({
    onClick
}) =>
    <div
        className={classNames.Toggle}
        onClick={onClick}
    />
