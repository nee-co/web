import getEvents      from "neeco/api/event/getEvents"
import classNames     from "neeco/views/pages/EventsView/classNames"
import LinkButton     from "neeco/views/parts/LinkButton"
import MainContainer  from "neeco/views/parts/MainContainer"
import React          from "react"
import {Link}         from "react-router"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            events: []
        })
    }

    componentDidMount() {
        getEvents({token: this.props.token, limit: 10})
            .then((events) => this.setState({events: events}))
            .catch((e) => {
            })
    }

    render() {
        var {} = this.props

        return (
            <MainContainer {... this.props}>
              <section className={classNames.EventsView}>
                <h2>イベント</h2>
                <LinkButton to="/new_event">
                  新規
                </LinkButton>
                <ul>
                  {
                      this.state.events.map(({id, title, description}) =>
                          <li key={id}>
                            <h4>{title}</h4>
                            {description}
                          </li> 
                      )
                  }
                </ul>
              </section>
            </MainContainer>
        )
    }
}
