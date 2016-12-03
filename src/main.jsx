var Authentication                  = require("neeco/views/Authentication")
var EventsView                      = require("neeco/views/pages/EventsView")
var FilesView                       = require("neeco/views/pages/FilesView")
var NewEventView                    = require("neeco/views/pages/NewEventView")
var PasswordSettingsView            = require("neeco/views/pages/PasswordSettingsView")
var SettingsView                    = require("neeco/views/pages/SettingsView")
var TopView                         = require("neeco/views/pages/TopView")
var React                           = require("react")
var {render}                        = require("react-dom")
var {Router, Route, browserHistory} = require("react-router")

render(
    <Router history={browserHistory}>
      <Route component={Authentication}>
        <Route
          path="/"
          component={TopView}
        />
        <Route
          path="/events"
          component={EventsView}
        />
        <Route
          path="/files"
          component={FilesView}
        />
        <Route
          path="/new_event"
          component={NewEventView}
        />
        <Route
          path="/settings"
          component={SettingsView}
        />
        <Route
          path="/settings/password"
          component={PasswordSettingsView}
        />
      </Route>
    </Router>,
    document.querySelector(".root")
)
