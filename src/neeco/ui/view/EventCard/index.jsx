var classNames = require("neeco/ui/view/EventCard/classNames")
var React      = require("react")

module.exports = (props) =>
    <div
        {... props}
        classNames={classNames.EventCard}
    >
        <img
            alt={props.event.image}
            width="128px"
            height="128px"
        />
        props.event.title<br />
        props.event.startDate<br />
    </div>