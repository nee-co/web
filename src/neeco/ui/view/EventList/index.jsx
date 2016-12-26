var classNames    = require("neeco/ui/view/EventList/classNames")
var EventListItem = require("neeco/ui/view/EventListItem")
var List          = require("neeco/ui/view/List")
var React         = require("react")

module.exports = ({
    className,
    events
}) =>
    <List
        className={[className, classNames.EventList].join(" ")}
    >
        {events.map((event) =>
            <EventListItem
                event={event}
                key={event.id}
            />
        )}
    </List>
