let getEvents     = require("neeco-client/api/event/getEvents")
let apply         = require("neeco-client/apply")
let config        = require("neeco-client/config")
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
                <List>
                    {this.state.events && this.state.events.map(x =>
                        <EventListItem
                            key={x.id}
                            event={x}
                        />
                    )}
                </List>
                <Indicator
                    loaded={this.state.loaded}
                    loading={this.state.loading}
                    onLoad={async e => {
                        this.setState({
                            loading: true
                        })

                        try {
                            let events = await getEvents({
                                apiHost: config["neeco_api_host"],
                                token  : apply(store, "token"),
                                query  : "",
                                owned  : true,
                                limit  : 10,
                                offset : this.state.offset
                            })

                            let eventLength = events.length

                            events.splice(0, 0, ...(this.state.events || []))

                            this.setState({
                                events : events,
                                loaded : eventLength == 0,
                                loading: false,
                                offset : this.state.offset + eventLength
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
