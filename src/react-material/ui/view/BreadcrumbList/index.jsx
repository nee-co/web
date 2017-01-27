let List       = require("react-material/ui/view/List")
let classNames = require("react-material/ui/view/BreadcrumbList/classNames")
let React      = require("react")

module.exports = ({
    className,
    ...props
}) =>
    <List
        {...props}
        className={[className, classNames.BreadcrumbList].join(" ")}
        component="ol"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
    />
