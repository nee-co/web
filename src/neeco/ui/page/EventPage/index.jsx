var getEvents        = require("neeco/api/event/getEvents")
var searchEvents     = require("neeco/api/event/searchEvents")
var classNames       = require("neeco/ui/page/EventPage/classNames")
var FormButton       = require("neeco/ui/view/FormButton")
var FormInput        = require("neeco/ui/view/FormInput")
var LinkButton       = require("neeco/ui/view/LinkButton")
var MainContainer    = require("neeco/ui/view/MainContainer")
var List             = require("neeco/ui/view/List")
var ListItem         = require("neeco/ui/view/ListItem")
var React            = require("react")
var {Link}           = require("react-router")
var {browserHistory} = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: [],
            ownedEvents: [],
            entriedEvents: []
        })
    }

    componentDidMount() {
        ;(async () => {
            var events = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : this.props.token,
                query  : "",
                limit  : 10
            })

            this.setState({events: events})
        })()

        ;(async () => {
            var entriedEvents = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : this.props.token,
                query  : "",
                entried: true,
                limit  : 10
            })

            this.setState({entriedEvents: entriedEvents})
        })()

        ;(async () => {
            var ownedEvents = await searchEvents({
                apiHost: process.env.NEECO_API_HOST,
                token  : this.props.token,
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
            <MainContainer
                {... this.props}
            >
                <section
                    className={classNames.EventPage}
                >
                    <h2>イベント</h2>
                    <div
                        className={classNames.PanelContainer}
                    >
                        <div>
                            <section>
                                <form
                                    className={classNames.SearchForm}
                                    onSubmit={async (e) => {
                                        e.preventDefault()

                                        var form = e.target

                                        var events = await searchEvents({
                                            apiHost: process.env.NEECO_API_HOST,
                                            token  : token,
                                            query  : form.query.value,
                                            limit  : 10
                                        })

                                        this.setState({events: events})
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
                                <EventList
                                    events={this.state.events}
                                />
                            </section>
                        </div>
                        <div>
                            <section>
                                <LinkButton
                                    className={classNames.NewEventButton}
                                    to="/new_event"
                                >
                                    開催する
                                </LinkButton>
                                <h3>開催イベント</h3>
                                <EventList
                                    events={this.state.ownedEvents}
                                />
                            </section>
                            <section>
                                <h3>参加予定イベント</h3>
                                <EventList
                                    events={this.state.entriedEvents}
                                />
                            </section>
                        </div>
                    </div>
                </section>
            </MainContainer>
        )
    }
}

var EventList = ({events}) =>  
    <List
        className={classNames.EventList}
    >
        {events.map((event) =>
            <EventListItem
                event={event}
                key={event.id}
            />
        )}
    </List>

var EventListItem = ({event}) => 
    <ListItem
        className={classNames.EventListItem}
        onClick={(e) => {
            browserHistory.push("/events/" + event.id)
        }}
    >
        <img
            alt={event.title}
            src={event.image}
            width="64px"
            height="64px"
        />
        <div>
            <h4
                className={classNames.EventTitle}
            >
                {event.title}
            </h4>
            <div
                className={classNames.EventDate}
            >
                {event.startDate}
            </div>
        </div>
    </ListItem>
