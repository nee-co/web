let React    = require("react")
let ListItem = require("react-material/ui/view/ListItem")

let classNames = require("neeco/ui/view/event/EventCard/classNames")

module.exports = ({
    className,
    event,
    ...props
}) =>
    <ListItem
        {...props}
        className={[className, classNames.EventCard].join(" ")}
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
    </ListItem>
