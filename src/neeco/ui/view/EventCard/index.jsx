var classNames = require("neeco/ui/view/EventCard/classNames")
var LinkPaper  = require("neeco/ui/view/LinkPaper")
var ListItem   = require("neeco/ui/view/ListItem")
var React      = require("react")

module.exports = ({
    className,
    event,
    ...props
}) =>
    <LinkPaper
        {...props}
        className={className + " " + classNames.EventCard}
        to={"/events/" + event.id}
    >
        <div
            className={classNames.Image}
            style={{
                backgroundImage: "url(\"" + event.image + "\")"
            }}
        >
        </div>
        <div
            className={classNames.InfoArea}
        >
            <p
                className={classNames.PrimaryText}
            >
                {event.title}
            </p>
            <p
                className={classNames.SubText}
            >
                {event.startDate}
            </p>
        </div>
    </LinkPaper>
