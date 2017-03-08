let ErrorListener         = require("neeco-client/ui/view/ErrorListener")
let MainLayout            = require("neeco-client/ui/view/MainLayout")
let SignInPage            = require("neeco-client/ui/view/auth/SignInPage")
let EventDetailPage       = require("neeco-client/ui/view/event/EventDetailPage")
let EventPage             = require("neeco-client/ui/view/event/EventPage")
let FolderDetailPage      = require("neeco-client/ui/view/file/FolderDetailPage")
let FolderPage            = require("neeco-client/ui/view/file/FolderPage")
let GroupDetailPage       = require("neeco-client/ui/view/group/GroupDetailPage")
let GroupPage             = require("neeco-client/ui/view/group/GroupPage")
let SettingsPage          = require("neeco-client/ui/view/settings/SettingsPage")
let TopPage               = require("neeco-client/ui/view/top/TopPage")
let UserDetailPage        = require("neeco-client/ui/view/user/UserDetailPage")
let UserPage              = require("neeco-client/ui/view/user/UserPage")
let AuthenticationManager = require("neeco-client/ui/wrapper/AuthenticationManager")
let UserManager           = require("neeco-client/ui/wrapper/UserManager")
let React                 = require("react")
let {Redirect}            = require("react-router")
let {Route}               = require("react-router")
let {Router}              = require("react-router")
let {browserHistory}      = require("react-router")

let Root = props =>
    <ErrorListener
        {...props}
    >
        <AuthenticationManager
            {...props}
        >
            <UserManager
                {...props}
            />
        </AuthenticationManager>
    </ErrorListener>

module.exports = props =>
    <Router
        history={browserHistory}
        {...props}
    >
        <Route
            component={Root}
        >
            <Route
                component={SignInPage}
                path="/sign_in"
            />
            <Route
                component={MainLayout}
            >
                <Route
                    component={TopPage}
                    path="/"
                />
                <Route
                    component={EventPage}
                    path="/events"
                />
                <Route
                    component={EventDetailPage}
                    path="/events/:event_id"
                />
                <Route
                    component={EventDetailPage}
                    path="/events/:event_id/comments"
                />
                <Route
                    component={EventDetailPage}
                    path="/events/:event_id/edit"
                />
                <Route
                    component={EventDetailPage}
                    path="/events/:event_id/entries"
                />
                <Route
                    component={FolderPage}
                    path="/folders"
                />
                <Route
                    component={FolderDetailPage}
                    path="/folders/:folder_id"
                />
                <Route
                    component={GroupPage}
                    path="/groups"
                />
                <Route
                    component={GroupDetailPage}
                    path="/groups/:group_id"
                />
                <Route
                    component={SettingsPage}
                    path="/settings"
                />
                <Route
                    component={UserPage}
                    path="/users"
                />
                <Route
                    component={UserDetailPage}
                    path="/users/:user_id"
                />
            </Route>
        </Route>
    </Router>
