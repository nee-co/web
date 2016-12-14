var Authentication                  = require("neeco/ui/page/Authentication")
var EventsPage                      = require("neeco/ui/page/EventsPage")
var FilesPage                       = require("neeco/ui/page/FilesPage")
var GroupsPage                      = require("neeco/ui/page/GroupsPage")
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
                component={EventsPage}
            />
            <Route
                path="/files"
                component={FilesPage}
            />
            <Route
                path="/groups"
                component={GroupsPage}
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
