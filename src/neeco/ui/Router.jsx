var EventCreationPage    = require("neeco/ui/page/event_creation/Page")
var EventDetailPage      = require("neeco/ui/page/event_detail/Page")
var EventsPage           = require("neeco/ui/page/events/Page")
var FolderDetailPage     = require("neeco/ui/page/folder_detail/Page")
var FoldersPage          = require("neeco/ui/page/folders/Page")
var GroupDetailPage      = require("neeco/ui/page/group_detail/Page")
var GroupsPage           = require("neeco/ui/page/groups/Page")
var SettingsPage         = require("neeco/ui/page/settings/Page")
var PasswordSettingsPage = require("neeco/ui/page/settings/password/Page")
var TopPage              = require("neeco/ui/page/top/Page")
var Authentication       = require("neeco/ui/wrapper/Authentication")
var MainLayout           = require("neeco/ui/wrapper/MainLayout")
var React                = require("react")
var {Route}              = require("react-router")
var {Router}             = require("react-router")
var {browserHistory}     = require("react-router")

module.exports = (props) =>
    <Router
        {...props}
        history={browserHistory}
    >
        <Route
            component={({children, ...props}) =>
                <Authentication
                    {...props}
                >
                    <MainLayout
                        children={children}
                    />
                </Authentication>
            }
        >
            <Route
                path="/"
                component={TopPage}
            />
            <Route
                path="/event_creation"
                component={EventCreationPage}
            />
            <Route
                path="/events"
                component={EventsPage}
            />
            <Route
                path="/events/:event_id"
                component={EventDetailPage}
            />
            <Route
                path="/folders"
                component={FoldersPage}
            />
            <Route
                path="/folders/:folder_id"
                component={FolderDetailPage}
            />
            <Route
                path="/groups"
                component={GroupsPage}
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
