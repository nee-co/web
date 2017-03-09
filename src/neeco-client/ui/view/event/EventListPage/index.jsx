let ListEvents    = require("neeco-client/api/request/ListEvents")
let EventList     = require("neeco-client/ui/view/event/EventList")
let EventListItem = require("neeco-client/ui/view/event/EventListItem")
let React         = require("react")
let Shadow        = require("react-material/ui/effect/Shadow")
let Indicator     = require("react-material/ui/view/Indicator")
let Search        = require("react-material/ui/view/Search")
let TextField     = require("react-material/ui/view/form/TextField")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/EventListPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events    : undefined,
            loading   : false,
            pageNumber: 0
        })
    }

    componentWillReceiveProps({
        location,
        client
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
            router,
            client,
            ...props
        } = this.props

        return (
            <div
                className={[className, classNames.Host].join(" ")}
                {...props}
            >
                <form
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
                    <Search
                        name="query"
                        placeholder="検索"
                    />
                </form>
                <EventList
                    type={"grid"}
                >
                    {this.state.events && this.state.events.map(x =>
                        <EventListItem
                            event={x}
                            key={x.id}
                        />
                    )}
                </EventList>
                <Indicator
                    loaded={
                        this.state.events
                     && this.state.events.length >= this.state.events.totalCount
                    }
                    loading={this.state.loading}
                    onNext={async e => {
                        this.setState({
                            loading: true
                        })

                        let events = await client(ListEvents({
                            query  : location.query["q"] || "",
                            page   : this.state.pageNumber + 1,
                            perPage: 10
                        }))

                        events.splice(0, 0, ...(this.state.events || []))

                        this.setState({
                            events    : events,
                            pageNumber: this.state.pageNumber + 1,
                            loading   : false
                        })
                    }}
                />
            </div>
        )
    }
}
