var searchEvents = require("neeco/api/event/searchEvents")
var EventList    = require("neeco/ui/view/EventList")
var LinkButton   = require("neeco/ui/view/LinkButton")
var classNames   = require("neeco/ui/page/events/OwnedEvents/classNames")
var React        = require("react")
var {Link}       = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: []
        })
    }

    componentDidMount() {
        var {
            token
        } = this.props

        ;(async () => {
            var events = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                query  : "",
                owned  : true,
                limit  : 10
            })

            this.setState({
                events: events
            })
        })()
    }

    render() {
        var {
            className,
            token,
            ...props
        } = this.props

        return (
            <section
                {...props}
                className={[className, classNames.OwnedEvents].join(" ")}
            >
                <EventList
                    events={this.state.events}
                />
            </section>
        )
    }
}
