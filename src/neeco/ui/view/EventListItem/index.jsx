var classNames       = require("neeco/ui/view/EventListItem/classNames")
var ListItem         = require("neeco/ui/view/ListItem")
var React            = require("react")
var {browserHistory} = require("react-router")

module.exports = ({event}) => 
    <ListItem
        className={classNames.EventListItem}
        onClick={(e) => {
            browserHistory.push("/events/" + event.id)
        }}
    >
        <div>
            <img
                alt={event.title}
                src={event.image}
                width="64px"
                height="64px"
            />
        </div>
        <div>
            <h4
                className={classNames.EventTitle}
            >
                {event.title}
            </h4>
            <div
                className={classNames.EventDate}
            >
                {event.startDate}
            </div>
        </div>
    </ListItem>
