let sanitize = require("neeco-client/encoding/html/sanitize")
let toHTML   = require("neeco-client/encoding/html/toHTML")
let React    = require("react")

let classNames = require("neeco-client/ui/view/Markdown/classNames")

module.exports = ({
    className,
    component = "div",
    Component = component,
    srcDoc,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        dangerouslySetInnerHTML={{
            __html: srcDoc && sanitize(toHTML(srcDoc))
        }}
        {...props}
    />
