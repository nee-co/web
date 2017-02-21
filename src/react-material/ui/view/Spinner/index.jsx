let React    = require("react")

let classNames = require("react-material/ui/view/Spinner/classNames")

module.exports = ({
    className,
    on,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host,
            ].join(" ")
        }
        {...props}
    />
