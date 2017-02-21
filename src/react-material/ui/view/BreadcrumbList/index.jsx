let List  = require("react-material/ui/view/List")
let React = require("react")

let classNames = require("react-material/ui/view/BreadcrumbList/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <List
        className={[className, classNames.Host].join(" ")}
        component="ol"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        orientation="horizontal"
        {...props}
    />
