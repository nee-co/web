let classNames = require("neeco/ui/view/EventCardList/classNames")
let EventCard  = require("neeco/ui/view/EventCard")
let List       = require("neeco/ui/view/List")
let ListItem   = require("neeco/ui/view/ListItem")
let React      = require("react")

module.exports = ({
    className,
    events,
    ...props
}) =>
    <List
        {...props}
        className={[className, classNames.EventCardList].join(" ")}
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
