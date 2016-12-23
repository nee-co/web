var classNames = require("neeco/ui/view/EventListItem/classNames")
var ListItem   = require("neeco/ui/view/ListItem")
var React      = require("react")
var {Link}     = require("react-router")

module.exports = ({
    className,
    event,
    ...props
}) => 
    <ListItem
        {...props}
        className={className}
    >
        <Link
            className={classNames.EventListItem}
            to={"/events/" + event.id}
        >
            <div>
                <img
                    className={classNames.EventImage}
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
        </Link>
    </ListItem>
