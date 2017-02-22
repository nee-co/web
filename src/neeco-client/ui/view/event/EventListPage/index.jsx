let getEvents     = require("neeco-client/api/event/getEvents")
let apply         = require("neeco-client/apply")
let config        = require("neeco-client/config")
let EventCard     = require("neeco-client/ui/view/event/EventCard")
let EventCardList = require("neeco-client/ui/view/event/EventCardList")
let React         = require("react")
let Shadow        = require("react-material/ui/effect/Shadow")
let Button        = require("react-material/ui/view/Button")
let Indicator     = require("react-material/ui/view/Indicator")
let TextField     = require("react-material/ui/view/form/TextField")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/EventListPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events    : undefined,
            pageNumber: 0,
            loading   : false
        })
    }

    componentWillReceiveProps({
        location,
        onError,
        store
    }) {
        if (location.query["q"] != this.props.location.query["q"]) {
            this.setState({
                events    : undefined,
                pageNumber: 0
            })
        }
    }

    render() {
        let {
            className,
            location,
            onError,
            router,
            store,
            ...props
        } = this.props

        return (
            <div
                className={[className, classNames.Host].join(" ")}
                {...props}
            >
                <form
                    className={classNames.SearchForm}
                    onSubmit={async e => {
                        e.preventDefault()

                        let form = e.target

                        router.push({
                            ...location,
                            query: {
                                ...location.query,
                                q: form.elements["query"].value
                            }
                        })
                    }}
                >
                    <TextField
                        name="query"
                        placeholder="検索"
                    />
                </form>
                <EventCardList>
                    {this.state.events && this.state.events.map(x =>
                        <EventCard
                            event={x}
                            key={x.id}
                        />
                    )}
                </EventCardList>
                <Indicator
                    loaded={
                        this.state.events
                     && this.state.events.length == this.state.events.totalCount
                    }
                    loading={this.state.loading}
                    onLoad={async e => {
                        this.setState({
                            loading: true
                        })

                        try {
                            let events = await getEvents({
                                apiHost: config["neeco_api_host"],
                                token  : apply(store, "token"),
                                query  : location.query["q"] || "",
                                page   : this.state.pageNumber + 1,
                                perPage: 10
                            })

                            events.splice(0, 0, ...(this.state.events || []))

                            this.setState({
                                events    : events,
                                pageNumber: this.state.pageNumber + 1,
                                loading   : false
                            })
                        } catch (e) {
                            onError(e)
                        }
                    }}
                />
            </div>
        )
    }
}
