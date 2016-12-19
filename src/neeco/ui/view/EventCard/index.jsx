var classNames = require("neeco/ui/view/EventCard/classNames")
var ListItem   = require("neeco/ui/view/ListItem")
var LinkCard   = require("neeco/ui/view/LinkCard")
var React      = require("react")

module.exports = ({event}) =>
    <LinkCard
        className={classNames.EventCard}
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
