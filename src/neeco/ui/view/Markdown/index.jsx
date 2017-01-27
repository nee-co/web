let sanitize = require("neeco/encoding/html/sanitize")
let toHTML   = require("neeco/encoding/html/toHTML")
let React    = require("react")

let classNames = require("neeco/ui/view/Markdown/classNames")

module.exports = ({
    className,
    component = "div",
    Component = component,
    srcDoc,
    ...props
}) =>
    <Component
        {...props}
        className={[className, classNames.Markdown].join(" ")}
        dangerouslySetInnerHTML={{
            __html: srcDoc && sanitize(toHTML(srcDoc))
        }}
    />
