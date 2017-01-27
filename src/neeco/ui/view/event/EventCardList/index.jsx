let EventCard = require("neeco/ui/view/event/EventCard")
let React     = require("react")
let List      = require("react-material/ui/view/List")

let classNames = require("neeco/ui/view/event/EventCardList/classNames")

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
                <EventCard
                    event={x}
                    key={x.id}
                />
            )
        }
    </List>
