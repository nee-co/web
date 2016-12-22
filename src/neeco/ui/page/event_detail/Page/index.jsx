var getEventByID = require("neeco/api/event/getEventByID")
var classNames   = require("neeco/ui/page/event_detail/Page/classNames")
var MainLayout   = require("neeco/ui/view/MainLayout")
var React        = require("react")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            event: {}
        })
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps({
        token,
        params
    }) {
        (async () => {
            var event = await getEventByID({
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
            <MainLayout
                {... this.props}
            >
                <article
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
                    <section className={classNames.EventDescription}>
                        {this.state.event.description}
                    </section>
                    <section className={classNames.EventMembers}>
                    </section>
                    
                </article>
            </MainLayout>
        )
    }
}

