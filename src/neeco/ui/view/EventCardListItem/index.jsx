var classNames       = require("neeco/ui/view/EventCardListItem/classNames")
var ListItem         = require("neeco/ui/view/ListItem")
var React            = require("react")
var {browserHistory} = require("react-router")

module.exports = ({event}) =>
    <ListItem
        className={classNames.EventCard}
    >
        <div
            className={classNames.EventImage}
            style={{
                backgroundImage: "url(\"" + event.image + "\")"
            }}
        >
        </div>
        <div>
            {event.title}<br />
            {event.startDate}<br />
        </div>
    </ListItem>
