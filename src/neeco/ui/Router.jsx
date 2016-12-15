var Authentication                  = require("neeco/ui/page/Authentication")
var EventPage                      = require("neeco/ui/page/EventPage")
var FilePage                       = require("neeco/ui/page/FilePage")
var GroupPage                      = require("neeco/ui/page/GroupPage")
var NewEventPage                    = require("neeco/ui/page/NewEventPage")
var PasswordSettingsPage            = require("neeco/ui/page/PasswordSettingsPage")
var SettingsPage                    = require("neeco/ui/page/SettingsPage")
var TopPage                         = require("neeco/ui/page/TopPage")
var React                           = require("react")
var {Router, Route, browserHistory} = require("react-router")

module.exports = (props) =>
    <Router
        {... props}
        history={browserHistory}
    >
        <Route
            component={Authentication}
        >
            <Route
                path="/"
                component={TopPage}
            />
            <Route
                path="/events"
                component={EventPage}
            />
            <Route
                path="/files"
                component={FilePage}
            />
            <Route
                path="/groups"
                component={GroupPage}
            />
            <Route
                path="/new_event"
                component={NewEventPage}
            />
            <Route
                path="/settings"
                component={SettingsPage}
            />
            <Route
                path="/settings/password"
                component={PasswordSettingsPage}
            />
        </Route>
    </Router>
