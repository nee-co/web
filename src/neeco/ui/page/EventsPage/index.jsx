var getEvents     = require("neeco/api/event/getEvents")
var searchEvents  = require("neeco/api/event/searchEvents")
var classNames    = require("neeco/ui/page/EventsPage/classNames")
var FormButton    = require("neeco/ui/view/FormButton")
var FormInput     = require("neeco/ui/view/FormInput")
var LinkButton    = require("neeco/ui/view/LinkButton")
var MainContainer = require("neeco/ui/view/MainContainer")
var Menu          = require("neeco/ui/view/Menu")
var MenuItem      = require("neeco/ui/view/MenuItem")
var React         = require("react")
var {Link}        = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: [],
            ownedEvents: [],
            entriedEvents: []
        })
    }

    componentDidMount() {
        searchEvents({
            apiHost: process.env.NEECO_API_HOST,
            token  : this.props.token,
            query  : "",
            limit  : 10
        })
            .then((events) => this.setState({events: events}))
            .catch((e) => {
            })

        searchEvents({
            apiHost: process.env.NEECO_API_HOST,
            token  : this.props.token,
            query  : "",
            entried: true,
            limit  : 10
        })
            .then((events) => this.setState({entriedEvents: events}))
            .catch((e) => {
            })

        searchEvents({
            apiHost: process.env.NEECO_API_HOST,
            token  : this.props.token,
            query  : "",
            owned  : true,
            limit  : 10
        })
            .then((events) => this.setState({ownedEvents: events}))
            .catch((e) => {
            })
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
                    className={classNames.EventsPage}
                >
                    <h2>イベント</h2>
                    <div className={classNames.PanelContainer}>
                        <div>
                            <section>
                                <form
                                    className={classNames.SearchForm}
                                    onSubmit={(e) => {
                                        e.preventDefault()

                                        var form = e.target

                                        searchEvents({
                                            apiHost: process.env.NEECO_API_HOST,
                                            token  : token,
                                            query  : form.query.value,
                                            limit  : 10
                                        })
                                            .then((events) => this.setState({events: events}))
                                            .catch((e) => {
                                            })
                                    }}
                                >
                                    <label>
                                        <FormInput
                                            name="query"
                                            type="text"
                                        />
                                    </label>
                                    <FormButton
                                        className={classNames.SearchButton}
                                    />
                                </form>
                                <EventListView
                                    events={this.state.events}
                                />
                            </section>
                        </div>
                        <div>
                            <div>
                                <LinkButton
                                    className={classNames.NewEventButton}
                                    to="/new_event"
                                >
                                    開催する
                                </LinkButton>
                            </div>
                            <section>
                                <h3>参加予定イベント</h3>
                                <EventListView
                                    events={this.state.entriedEvents}
                                />
                            </section>
                            <section>
                                <h3>開催イベント</h3>
                                <EventListView
                                    events={this.state.ownedEvents}
                                />
                            </section>
                        </div>
                    </div>
                </section>
            </MainContainer>
        )
    }
}

var EventListView = ({events}) =>  
    <Menu
        className={classNames.EventList}
    >
        {
            events.map((event) =>
                <MenuItem
                    key={event.id}
                    className={classNames.Event}
                >
                    <h4>{event.title}</h4>
                    <span
                        className={classNames.date}>
                        {event.startDate}
                    </span>
                </MenuItem>
            )
        }
    </Menu>
