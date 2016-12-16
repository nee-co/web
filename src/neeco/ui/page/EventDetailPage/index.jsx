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
                    <header
                        className={classNames.Header}
                    >
                        <div>
                            <h2>{this.state.event.title}</h2>
                            {this.state.event.startDate}
                        </div>
                        <img
                            src={this.state.event.image}
                            alt={this.state.event.title}
                            width="128"
                            height="128"
                        />
                    </header>
                    <section>
                        {this.state.event.description}
                    </section>
                </section>
            </MainContainer>
        )
    }
}

