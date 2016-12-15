var classNames        = require("neeco/ui/view/EventCardList/classNames")
var EventCardListItem = require("neeco/ui/view/EventCardListItem")
var List              = require("neeco/ui/view/List")
var React             = require("react")

module.exports = ({events}) =>
    <List className={classNames.EventCardList}>
        {
            events.map((x) =>
                <EventCardListItem
                    event={x}
                    key={x.id}
                />
            )
        }
    </List>
