let React = require("react")
let List  = require("react-material/ui/view/List")

let classNames = require("neeco-client/ui/view/event/EventCardList/classNames")

module.exports = ({
    className,
    ...props
}) =>
    <List
        {...props}
        className={[className, classNames.Host].join(" ")}
    />
