var classNames       = require("neeco/ui/view/EventCardListItem/classNames")
var ListItem         = require("neeco/ui/view/ListItem")
var React            = require("react")
var {browserHistory} = require("react-router")

module.exports = ({event}) =>
    <ListItem
        className={classNames.EventCardListItem}
    >
        <div
            className={classNames.EventImage}
            style={{
                backgroundImage: "url(\"" + event.image + "\")"
            }}
        >
        </div>
        <div
            className={classNames.EventInfo}
        >
            <p className={classNames.EventTitle}>{event.title}</p>
            <p className={classNames.EventDate}>{event.startDate}</p>
        </div>
    </ListItem>
