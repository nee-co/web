let Ripple          = require("neeco/ui/effect/Ripple")
let Shadow          = require("neeco/ui/effect/Shadow")
let FontAwesomeIcon = require("neeco/ui/view/FontAwesomeIcon")
let Logo            = require("neeco/ui/view/Logo")
let classNames      = require("neeco/ui/view/Toolbar/classNames")
let React           = require("react")

module.exports = ({
    onToggle,
    user,
    ...props
}) =>
    <Shadow
        className={classNames.Toolbar}
        component={"header"}
    >
        <Ripple
            className={classNames.Toggle}
            children={"\uF0C9"}
            component={FontAwesomeIcon}
            fixed
            onClick={onToggle}
        />
        <h1>
            <Logo />
        </h1>
    </Shadow>
