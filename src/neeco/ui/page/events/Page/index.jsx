var getEvents     = require("neeco/api/event/getEvents")
var searchEvents  = require("neeco/api/event/searchEvents")
var classNames    = require("neeco/ui/page/events/Page/classNames")
var EventCardList = require("neeco/ui/view/EventCardList")
var EventList     = require("neeco/ui/view/EventList")
var FormButton    = require("neeco/ui/view/form/Button")
var Input         = require("neeco/ui/view/form/Input")
var LinkButton    = require("neeco/ui/view/LinkButton")
var List          = require("neeco/ui/view/List")
var ListItem      = require("neeco/ui/view/ListItem")
var MainLayout    = require("neeco/ui/view/MainLayout")
var Paper         = require("neeco/ui/view/Paper")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events       : [],
            ownedEvents  : [],
            entriedEvents: []
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
                limit  : 10
            })

            this.setState({events: events})
        })()

        ;(async () => {
            var entriedEvents = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                query  : "",
                entried: true,
                limit  : 10
            })

            this.setState({entriedEvents: entriedEvents})
        })()

        ;(async () => {
            var ownedEvents = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : token,
                query  : "",
                owned  : true,
                limit  : 10
            })

            this.setState({ownedEvents: ownedEvents})
        })()
    }

    render() {
        var {
            token
        } = this.props

        return (
            <MainLayout
                {...this.props}
            >
                <section
                    className={classNames.EventPage}
                >
                    <h2>イベント</h2>
                    <div
                        className={classNames.PanelContainer}
                    >
                        <div>
                            <Paper>
                                <form
                                    className={classNames.SearchForm}
                                    onSubmit={async (e) => {
                                        e.preventDefault()

                                        var formData = new FormData(e.target)

                                        var events = await searchEvents({
                                            apiHost: process.env.NEECO_API_HOST,
                                            token  : token,
                                            query  : formData.getAll("query"),
                                            limit  : 10
                                        })

                                        this.setState({events: events})
                                    }}
                                >
                                    <label>
                                        <Input
                                            name="query"
                                            type="text"
                                        />
                                    </label>
                                    <FormButton
                                        className={classNames.SearchButton}
                                    />
                                </form>
                            </Paper>
                            <EventCardList
                                events={this.state.events}
                            />
                        </div>
                        <div>
                            <Paper
                                className={classNames.EventListCard}
                            >
                                <header>
                                    <h3>開催イベント</h3>
                                    <LinkButton
                                        className={classNames.NewEventButton}
                                        to="/event_creation"
                                    >
                                        イベント作成
                                    </LinkButton>
                                </header>
                                <EventList
                                    events={this.state.ownedEvents}
                                />
                            </Paper>
                            <Paper
                                className={classNames.EventListCard}
                            >
                                <header>
                                    <h3>参加予定</h3>
                                </header>
                                <EventList
                                    events={this.state.entriedEvents}
                                />
                            </Paper>
                        </div>
                    </div>
                </section>
            </MainLayout>
        )
    }
}
