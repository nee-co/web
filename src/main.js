import Authentication                  from "neeco/views/Authentication"
import EventsView                      from "neeco/views/pages/EventsView"
import FilesView                       from "neeco/views/pages/FilesView"
import NewEventView                    from "neeco/views/pages/NewEventView"
import PasswordSettingsView            from "neeco/views/pages/PasswordSettingsView"
import SettingsView                    from "neeco/views/pages/SettingsView"
import TopView                         from "neeco/views/pages/TopView"
import React                           from "react"
import {render}                        from "react-dom"
import {Router, Route, browserHistory} from "react-router"

render(
    <Router history={browserHistory}>
      <Route component={Authentication}>
        <Route path="/"                  component={TopView} />
        <Route path="/events"            component={EventsView} />
        <Route path="/files"             component={FilesView} />
        <Route path="/new_event"         component={NewEventView} />
        <Route path="/settings"          component={SettingsView} />
        <Route path="/settings/password" component={PasswordSettingsView} />
      </Route>
    </Router>,
    document.querySelector(".root")
)
