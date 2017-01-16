let EventCreationPage    = require("neeco/ui/page/event_creation/Page")
let EventDetailPage      = require("neeco/ui/page/event_detail/Page")
let EventsPage           = require("neeco/ui/page/events/Page")
let FolderDetailPage     = require("neeco/ui/page/folder_detail/Page")
let FoldersPage          = require("neeco/ui/page/folders/Page")
let GroupDetailPage      = require("neeco/ui/page/group_detail/Page")
let GroupsPage           = require("neeco/ui/page/groups/Page")
let SettingsPage         = require("neeco/ui/page/settings/Page")
let PasswordSettingsPage = require("neeco/ui/page/settings/password/Page")
let TopPage              = require("neeco/ui/page/top/Page")
let Authentication       = require("neeco/ui/wrapper/Authentication")
let MainLayout           = require("neeco/ui/wrapper/MainLayout")
let React                = require("react")
let {Route}              = require("react-router")
let {Router}             = require("react-router")
let {browserHistory}     = require("react-router")

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
                path="/events/:event_id/comments"
                component={EventDetailPage}
            />
            <Route
                path="/events/:event_id/entries"
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
