let React            = require("react")
let Image            = require("react-material/ui/view/Image")
let ListItem         = require("react-material/ui/view/ListItem")
let ListItemIcon     = require("react-material/ui/view/ListItemIcon")
let ListItemTextArea = require("react-material/ui/view/ListItemTextArea")

let classNames = require("neeco-client/ui/view/event/EventListItem/classNames")

module.exports = ({
    className,
    event,
    ...props
}) => 
    <ListItem
        {...props}
        className={[className, classNames.Host].join(" ")}
        to={"/events/" + event.id}
    >
        <ListItemIcon
            alt={event.title}
            src={event.image}
        />
        <ListItemTextArea>
            <p
                className={classNames.EventTitle}
            >
                {event.title}
            </p>
            <p
                className={classNames.EventDate}
            >
                {event.startDate}
            </p>
        </ListItemTextArea>
    </ListItem>
