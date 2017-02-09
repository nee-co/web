let SignInPage       = require("neeco-client/ui/view/auth/SignInPage")
let EventDetailPage  = require("neeco-client/ui/view/event/EventDetailPage")
let EventPage        = require("neeco-client/ui/view/event/EventPage")
let FolderDetailPage = require("neeco-client/ui/view/file/FolderDetailPage")
let FolderPage       = require("neeco-client/ui/view/file/FolderPage")
let GroupDetailPage  = require("neeco-client/ui/view/group/GroupDetailPage")
let GroupPage        = require("neeco-client/ui/view/group/GroupPage")
let SettingsPage     = require("neeco-client/ui/view/settings/SettingsPage")
let TopPage          = require("neeco-client/ui/view/top/TopPage")
let Authentication   = require("neeco-client/ui/wrapper/Authentication")
let MainLayout       = require("neeco-client/ui/wrapper/MainLayout")
let React            = require("react")
let {Redirect}       = require("react-router")
let {Route}          = require("react-router")
let {Router}         = require("react-router")
let {browserHistory} = require("react-router")

module.exports = props =>
    <Router
        {...props}
        history={browserHistory}
    >
        <Route
            component={Authentication}
        >
            <Route
                path="/sign_in"
                component={SignInPage}
            />
            <Route
                component={MainLayout}
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
                    component={FolderPage}
                />
                <Route
                    path="/folders/:folder_id"
                    component={FolderDetailPage}
                />
                <Route
                    path="/groups"
                    component={GroupPage}
                />
                <Route
                    path="/settings"
                    component={SettingsPage}
                />
            </Route>
        </Route>
    </Router>
