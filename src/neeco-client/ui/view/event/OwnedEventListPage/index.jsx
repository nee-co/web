let ListEvents     = require("neeco-client/api/request/ListEvents")
let EventList     = require("neeco-client/ui/view/event/EventList")
let EventListItem = require("neeco-client/ui/view/event/EventListItem")
let React         = require("react")
let List          = require("react-material/ui/view/List")
let Indicator     = require("react-material/ui/view/Indicator")
let {Link}        = require("react-router")

let classNames = require("neeco-client/ui/view/event/OwnedEventListPage/classNames")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events : undefined,
            loaded : false,            
            loading: false,
            offset : 0
        })
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
                <EventList>
                    {this.state.events && this.state.events.map(x =>
                        <EventListItem
                            key={x.id}
                            event={x}
                        />
                    )}
                </EventList>
                <Indicator
                    loaded={this.state.loaded}
                    loading={this.state.loading}
                    onNext={async e => {
                        this.setState({
                            loading: true
                        })

                        let events = await client(ListEvents({
                            query  : "",
                            owned  : true,
                            limit  : 10,
                            offset : this.state.offset
                        }))

                        let eventLength = events.length

                        events.splice(0, 0, ...(this.state.events || []))

                        this.setState({
                            events : events,
                            loaded : eventLength == 0,
                            loading: false,
                            offset : this.state.offset + eventLength
                        })
                    }}
                />
            </div>
        )
    }
}
