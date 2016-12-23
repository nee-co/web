var classNames = require("neeco/ui/view/EventCardList/classNames")
var EventCard  = require("neeco/ui/view/EventCard")
var List       = require("neeco/ui/view/List")
var ListItem   = require("neeco/ui/view/ListItem")
var React      = require("react")

module.exports = ({
    className,
    events,
    ...props
}) =>
    <List
        {...props}
        className={className + " " + classNames.EventCardList}
    >
        {
            events.map((x) =>
                <ListItem
                    key={x.id}
                >
                    <EventCard
                        event={x}
                    />
                </ListItem>
            )
        }
    </List>
