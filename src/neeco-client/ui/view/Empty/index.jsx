let React = require("react")

let classNames = require("neeco-client/ui/view/Empty/classNames")

module.exports = ({
    className,
    children = <p>リストにアイテムが存在しません。</p>,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host
            ].join(" ")
        }
        {...props}
    />
