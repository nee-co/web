let EventList     = require("neeco-client/ui/view/event/EventList")
let EventListItem = require("neeco-client/ui/view/event/EventListItem")
let React         = require("react")
let Shadow        = require("react-material/ui/effect/Shadow")
let Indicator     = require("react-material/ui/view/Indicator")
let Search        = require("react-material/ui/view/Search")
let TextField     = require("react-material/ui/view/form/TextField")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/EventSearchPage/classNames")

module.exports =  ({
    className,
    events,
    loading,
    onNext,
    onSearch = x => undefined,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
        <form
            onSubmit={e => {
                e.preventDefault()

                let form = e.target

                onSearch(form.elements["query"].value)
            }}
        >
            <Search
                name="query"
                placeholder="検索"
            />
        </form>
        <EventList
            type={"grid"}
        >
            {events && events.map(x =>
                <EventListItem
                    event={x}
                    key={x.id}
                />
            )}
        </EventList>
        <Indicator
            loaded={events && events.length >= events.totalCount}
            loading={loading}
            onNext={onNext}
        />
    </div>
