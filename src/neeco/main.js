import React                           from "react"
import {render}                        from "react-dom"
import {Router, Route, browserHistory} from "react-router"
import Authentication                  from "neeco/views/Authentication"
import EventsView                      from "neeco/views/EventsView"
import FilesView                       from "neeco/views/FilesView"
import NewEventView                    from "neeco/views/NewEventView"
import SettingsView                    from "neeco/views/SettingsView"
import TopView                         from "neeco/views/TopView"

render(
    <Router history={browserHistory}>
      <Route component={Authentication}>
        <Route path="/"          component={TopView} />
        <Route path="/events"    component={EventsView} />
        <Route path="/files"     component={FilesView} />
        <Route path="/new_event" component={NewEventView} />
        <Route path="/settings"  component={SettingsView} />
      </Route>
    </Router>,
    document.querySelector(".root")
)
