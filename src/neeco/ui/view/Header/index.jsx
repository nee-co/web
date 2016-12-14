var classNames = require("neeco/ui/view/Header/classNames")
var Toggle     = require("neeco/ui/view/Toggle")
var React      = require("react")

module.exports = ({
    onToggle,
    user
}) =>
    <header
        className={classNames.Header}
    >
        <Toggle
            onClick={onToggle}
        />
        <h1
            className={classNames.Logo}
        >
            Nee-co
        </h1>
    </header>
