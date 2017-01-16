let Root       = require("neeco/ui/control/Root")
let Shadow     = require("neeco/ui/effect/Shadow")
let classNames = require("neeco/ui/control/Dialog/classNames")
let React      = require("react")

module.exports = ({
    children,
    className,
    visible,
    onCancel,
    ...props
}) =>
    <Root
        className={
            [
                classNames.Root,
                visible ? undefined
              :           classNames.Hidden
            ].join(" ")
        }
        onClick={onCancel && ((e) => {
            if (!e.currentTarget.children[0].contains(e.target))
                onCancel(e)
        })}
        ref={(e) => {
        }}
    >
        <Shadow
            className={[className, classNames.Dialog].join(" ")}
            elevation={24}
            {...props}
        >
            {children}
        </Shadow>
    </Root>
