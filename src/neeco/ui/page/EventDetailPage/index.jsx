var getEventOfID  = require("neeco/api/event/getEventOfID")
var classNames    = require("neeco/ui/page/EventDetailPage/classNames")
var MainContainer = require("neeco/ui/view/MainContainer")
var React         = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event: {}
        })
    }

    componentDidMount() {
        var {
            token,
            params
        } = this.props

        ;(async () => {
            var event = await getEventOfID({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                id     : params["event_id"]
            })

            this.setState({event: event})
        })()
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainContainer
                {... this.props}
            >
                <section
                    className={classNames.EventDetailPage}
                >
                    <img
                        src={this.state.event.image}
                        alt="this.state.event.title"
                        width="128"
                        height="128"
                    />
                    <h2>{this.state.event.title}</h2>
                </section>
            </MainContainer>
        )
    }
}

