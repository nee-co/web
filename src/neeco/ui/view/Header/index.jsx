var FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
var Logo            = require("neeco/ui/view/Logo")
var classNames      = require("neeco/ui/view/Header/classNames")
var React           = require("react")

module.exports = ({
    onToggle,
    user,
    ...props
}) =>
    <header
        className={classNames.Header}
    >
        <FontAwesomeIcon
            className={classNames.Toggle}
            children={"\uF0C9"}
            onClick={onToggle}
        />
        <h1>
            <Logo />
        </h1>
    </header>
