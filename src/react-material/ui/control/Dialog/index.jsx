let Root   = require("react-material/ui/control/Root")
let Shadow = require("react-material/ui/effect/Shadow")
let React  = require("react")

let classNames = require("react-material/ui/control/Dialog/classNames")

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
    >
        <Shadow
            className={[className, classNames.Dialog].join(" ")}
            elevation={24}
            {...props}
        >
            {visible && children}
        </Shadow>
    </Root>
