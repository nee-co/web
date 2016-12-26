var searchEvents = require("neeco/api/event/searchEvents")
var EventList    = require("neeco/ui/view/EventList")
var classNames   = require("neeco/ui/page/events/EntriedEvents/classNames")
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
                entried: true,
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
                className={[className, classNames.EntriedEvents].join(" ")}
            >
                <EventList
                    events={this.state.events}
                />
            </section>
        )
    }
}
