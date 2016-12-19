var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var classNames      = require("neeco/ui/view/Header/classNames")
var React           = require("react")

module.exports = ({
    onToggle,
    user
}) =>
    <header
        className={classNames.Header}
    >
        <FontAwesomeIcon
            className={classNames.Toggle}
            children={"\uF0C9"}
            onClick={onToggle}
        />
        <h1
            className={classNames.Logo}
        >
            Nee-co
        </h1>
    </header>
