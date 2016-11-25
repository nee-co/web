var getEvents      = require("neeco/api/event/getEvents")
var getOwnedEvents = require("neeco/api/event/getOwnedEvents")
var classNames     = require("neeco/views/pages/EventsView/classNames")
var LinkButton     = require("neeco/views/parts/LinkButton")
var MainContainer  = require("neeco/views/parts/MainContainer")
var React          = require("react")
var {Link}         = require("react-router")

module.exports = class extends React.Component {
    componentWillMount() {
        this.setState({
            events: [],
            ownedEvents: []
        })
    }

    componentDidMount() {
        getEvents({token: this.props.token, limit: 10})
            .then((events) => this.setState({events: events}))
            .catch((e) => {
            })

        getOwnedEvents({token: this.props.token, limit: 10})
            .then((events) => this.setState({ownedEvents: events}))
            .catch((e) => {
            })
    }

    render() {
        var {} = this.props

        return (
            <MainContainer {... this.props}>
              <section className={classNames.EventsView}>
                <h2>イベント</h2>
                <div>
                  <section>
                    <h3>新着イベント</h3>
                    <EventList events={this.state.events} />
                  </section>
                  <section>
                    <h3>管理イベント</h3>
                    <LinkButton to="/new_event">
                    新規
                    </LinkButton>
                    <EventList events={this.state.ownedEvents} />
                  </section>
                </div>
              </section>
            </MainContainer>
        )
    }
}

var EventList = ({events}) =>  
    <ul className={classNames.EventListView}>
      {
          events.map(({id, title, description}) =>
              <li key={id}>
                <h4>{title}</h4>
                {description}
              </li>
          )
      }
    </ul>
