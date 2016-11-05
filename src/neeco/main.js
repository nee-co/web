import React                           from "react"
import {render}                        from "react-dom"
import {Router, Route, browserHistory} from "react-router"
import EventsView                      from "neeco/views/EventsView"
import FilesView                       from "neeco/views/FilesView"
import NewEventView                    from "neeco/views/NewEventView"
import ProfileView                     from "neeco/views/ProfileView"
import SignInView                      from "neeco/views/SignInView"
import TopView                         from "neeco/views/TopView"
import AuthenticationContainer         from "neeco/views/common/AuthenticationContainer"

render(
    <Router history={browserHistory}>
      <Route path="/" component={TopView} />
      <Route path="/sign_in" component={SignInView} />
      <Route component={AuthenticationContainer}>
        <Route path="/events" component={EventsView} />
        <Route path="/files" component={FilesView} />
        <Route path="/new_event" component={NewEventView} />
        <Route path="/profile" component={ProfileView} />
      </Route>
    </Router>,
    document.querySelector(".root")
)
