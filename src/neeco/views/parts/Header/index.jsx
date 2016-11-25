var classNames = require("neeco/views/parts/Header/classNames")
var Toggle     = require("neeco/views/parts/Toggle")
var React      = require("react")

module.exports = ({
    onToggle,
    user
}) =>
    <header className={classNames.Header}>
      <Toggle onClick={onToggle} />
      <h1 className={classNames.Logo}>
        Nee-co
      </h1>
    </header>
