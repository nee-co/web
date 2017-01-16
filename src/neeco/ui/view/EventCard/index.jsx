let classNames = require("neeco/ui/view/EventCard/classNames")
let LinkCard   = require("neeco/ui/view/LinkCard")
let ListItem   = require("neeco/ui/view/ListItem")
let React      = require("react")

module.exports = ({
    className,
    event,
    ...props
}) =>
    <LinkCard
        {...props}
        className={[className, classNames.EventCard].join(" ")}
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
    </LinkCard>
